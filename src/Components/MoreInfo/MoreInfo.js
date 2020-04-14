import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import M  from 'materialize-css'
import './MoreInfo.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MapContainer from './MapContainer';
import { Link } from "react-router-dom";

const MoreInfo = withRouter(props => <MoreInfoChild {...props}/>);

class MoreInfoChild extends Component {
  state = {
    visible: true,
    restaurantID: null,
    resName: "",
    resPhotos: [],
    rating: null,
    ratingText: "",
    votes: 0,
    width: 0,
    height: 0,
    timings: "",
    currentHour: 0,
    currentMinute: 0,
    resHourOpening: 0,
    resMinuteOpening: 0,
    resHourClosing: 0,
    resHourClosing: 0,
  }

 componentDidMount() {
   //resize listener
   var w = window.innerWidth;
   var h = window.innerHeight;
    this.setState({
      width: w,
      height: h
    })
  //get Current time
  var d = new Date(); // for now
  d.getHours();
  d.getMinutes();
  this.setState({
    currentHour: d.getHours(),
    currentMinute: d.getMinutes()
  })

   window.addEventListener("resize", ()=>{
     w = window.innerWidth;
     h = window.innerHeight;
      this.setState({
        width: w,
        height: h
      })

   });

    this.setState({
        restaurantID: this.props.match.params.dynamic
        },()=>{
        const url =`https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.state.restaurantID}`
        fetch(url, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'user-key': 'f7a5b883bef34e0148437a909b393a96'
            }
          })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
          console.log(res);
          
            this.setState({
                resName: res.name,
                resId: res.id,
                resPhotos: res.photos,
                rating: res.user_rating.aggregate_rating,
                ratingText: res.user_rating.rating_text,
                votes: res.user_rating.votes,
                location :res.location.address,
                timings: res.timings,
                cuisines: res.cuisines,
                number: res.phone_numbers,
                delivers: res.has_online_delivery,
                lat: res.location.latitude,
                long: res.location.longitude
            });
            //set time/if open
            this.updateTime();

        })
        .catch((err)=>{
            alert("error in fetch");
        })


    })
 
 
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems);
      });
 }
 updateTime = ()=>{
  const timeStr = "7:30 AM to 5:30 PM (Mon-Tue),7:30 AM to 11 PM (Wed-Fri),9:30 AM to 5 PM, 5:30 PM to 11 PM (Sat),9:30 AM to 5 PM (Sun)"
  const regex = /[1-9].[0-9]/g;
  const matchArry = timeStr.match(regex);
  const openingHoursSplit = matchArry[0].split(":");
  const closingHoursSplit = matchArry[1].split(":");

  this.setState({
    resHourOpening: Number(openingHoursSplit[0]),
    resMinuteOpening: Number(openingHoursSplit[1]),
    resHourClosing: Number(closingHoursSplit[0]),
    resMinuteClosing: Number(closingHoursSplit[1]),
  },()=>{this.seeIfOpen()})

 }
 seeIfOpen = ()=>{

 }

 getRatingHtml = ()=>{
   //check is state is there
   if(this.state.rating && this.state.ratingText && this.state.votes) {
      //lop to 5 and return spans based on comparing rating with loop count
      let divi = React.createElement("div", { className: "noclass" });
      const arrayOfSpans = []

      for(var i = 1; i <= 5; i++) {
        if(i < this.state.rating) {
          arrayOfSpans.push( <span className="fa fa-star checked" key={i}></span>)
        }
        else {
          arrayOfSpans.push( <span className="fa fa-star"  key={i}></span>)
        }
      }
      console.log(divi);
      
     
     return arrayOfSpans
   }
   else {
    return <div>no rating available</div>
   }

 }

 updateSlidesToShow = ()=>{
   //small scree
   if(this.state.width < 700) {
      return 1;
   }
   else {
     return 3;
   }
   
 }


  render() {
    const photos =this.state.resPhotos;
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: this.updateSlidesToShow(),
      slidesToScroll: 1
    };

    const rating = this.getRatingHtml()

    return <div className="container">
            
        
      {photos.length === 0 ? <div></div>:
      <div className="container">
        <div className="row">
          {/* Dummy Div */}
          {/* <div className="col s0 m2"></div> */}
          <div className="col s12 center-align">
                <div className="card">
                  <div className="card-content black-text">
                    <span className="card-title black-text">{this.state.resName}</span>
                    <p>{this.state.location}</p>
                    <div className="shtyle">  
                      <MapContainer
                       
                        lat={this.state.lat}
                        long={this.state.long}
                            />
                    </div>
                  
                  </div>
                  <div className="card-action" >
                    <Slider {...settings}>
                      {photos.map((photoObj,i)=>{
                        return <div key={i} className="img-wrapper">
                          <img className="slider-img" src={photoObj.photo.url} alt=""/>
                          </div>
                      })}
                    </Slider>
                    
                  </div>
                  <div className="card-action" style={{padding: '0', border: 'none'}}>
                      <ul className="collection with-header left-align">
                        <li className="collection-header"><h4>{this.state.resName}</h4></li>
                        <li className="collection-item">
                        {rating} <span>{this.state.votes} votes</span>
                        </li>
                        <li className="collection-item">Cuisines: {this.state.cuisines}</li>
                    <li className="collection-item">Number: {this.state.number}</li>
       
                        <li className="collection-item">Delivery Service: {this.state.delivers === 0 ?<span>No</span>:<span>Yes</span>}</li>
                      </ul>
                  </div>
                </div>
            </div>
          {/* Dummy Div */}
          {/* <div className="col s0 m2"></div> */}
        </div>
        <Link 
        onClick={this.props.history.goBack}
        className="row">Go Back</Link>
      </div>
            
      }
                
    </div>

  }
}


export default MoreInfo;

