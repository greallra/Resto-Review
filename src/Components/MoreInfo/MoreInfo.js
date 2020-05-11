import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import M  from 'materialize-css'
import './MoreInfo.css'
import MapContainer from './MapContainer';
import { Link } from "react-router-dom";
import { keys } from '../../keys';
import ReactLoader from '../Elements/ReactLoader';

const MoreInfo = withRouter(props => <MoreInfoChild {...props}/>);

class MoreInfoChild extends Component {
  state = {
    loading: true,
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

  componentWillMount() {
    this.setState({loading: true})
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
              'user-key': keys.zomatoApiKey
            }
          })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{

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
  this.setState({loading: false})
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
     return arrayOfSpans
   }
   else {
    return <div>no rating available</div>
   }

 }

  render() {
    const photos =this.state.resPhotos;

    const rating = this.getRatingHtml();
    const loading = this.state.loading;

    return loading? <ReactLoader />:<div className="container">
      {photos.length === 0 ? <div></div>:
      <div className="container">
        <div className="row">
          {/* Dummy Div */}
          {/* <div className="col s0 m2"></div> */}
          <div className="col s12">
            <div className="info-head">
              <h4>{this.state.resName}</h4>
              <p>{this.state.location}</p>
            </div>
            <div className="img-cont"><img className="slider-img" src={this.state.resPhotos[Math.floor(Math.random() * 10)].photo.url} alt=""/></div>
            <div className="map-review-section">
                <div className="map-outer">
                  <div className="shtyle">  
                    {/* <MapContainer
                      lat={this.state.lat}
                      long={this.state.long}
                          /> */}
                  </div>
                </div>
                <ul className="reviews-ul">
                      <li className="votes">
                      {rating} <span>{this.state.votes} votes</span>
                      </li>
                      <li className=""><span className="bold-ones">Cuisines:</span> {this.state.cuisines}</li>
                      <li className=""><span className="bold-ones">Number:</span>  {this.state.number}</li>
                      <li className=""><span className="bold-ones">Delivery Service:</span>  {this.state.delivers === 0 ?<span>No</span>:<span>Yes</span>}</li>
                  </ul>
              </div>
            </div>{/* col*/}
        </div>{/* row*/}
        <div className="row">
          <div className="col s12">
              <Link 
              onClick={this.props.history.goBack}
              className="row more-info2">Go Back</Link>
        </div>
        </div>
        
      </div>
            
      }
                
    </div>

  }
}


export default MoreInfo;

