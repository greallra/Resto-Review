import React, { Component } from 'react'
import LoadingBar from '../Elements/LoadingBar';
import './Reviews.css';
import {Link }from "react-router-dom";
import data from './data';
import { keys } from '../../keys';

class Reviews extends Component {
  state ={
    locationText : "",
    locationVerified: false,
    error: false,
    lat: null,
    long: null,
    rests : [],
    loading: false
  }
  componentWillUpdate() {
   
  }
  componentDidMount() {
   //set state with dummy data for now
   this.setState({rests: data, city: data[0].restaurant.location.city})
  

      //clear input
      this.setState({locationText : ""})
      const goog = window.google
      let input = document.getElementById("searchTextField");
      
      const autoCompleteObject = new goog.maps.places.Autocomplete(input);
      
     // event listener on autocomplete
     try{
      autoCompleteObject.addListener('place_changed', ()=> {
          //get the inputted address predcited by using the event listener on autocomplete
          /*
            Au {
              __e3_ : {},
              gm_bindings_ : {},
              gm_accessors_ : place : {
                                        ue : P9 : {
                                          a,
                                          b,
                                          b,
                                          d,
                                          gm_accessors_ : {
                                              a,
                                              c,
                                              d,
                                              formattedPrediction
                                            },
                                          querMode,
                                          gm_bindings" {},
                                          formattedPrediction
                                        },
                                        Hc: "place",
                                        wi: {
                                          ue : Au {
                                              __e3_ : {
                                                place_changed : {1 : qe},
                                                resize : 13 : {}
                                              }
                                            },
                                          Hc : "place",
                                          closure_uid_308817748: 14
                                        }
                                      }
            }

          */
         let newSearchValue;
         if(autoCompleteObject.gm_accessors_.place.hasOwnProperty('ue')){
          newSearchValue=autoCompleteObject.gm_accessors_.place.ue.formattedPrediction;
         } else if(autoCompleteObject.gm_accessors_.place.hasOwnProperty('ze')) {
          newSearchValue=autoCompleteObject.gm_accessors_.place.ze.formattedPrediction;
         } else {
           newSearchValue = "neither condition worked"
         }
         
        })
    }catch(err){
    }
          // this.setState({locationText: newSearchValue},()=>{})
     
  }

  handleCheckLocation = (e)=>{

   //use location search to get lat long
   const url = `https://developers.zomato.com/api/v2.1/locations?query=${this.state.locationText}`
   fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'user-key': keys.zomatoApiKey
    }
      })
    .then(res => res.json())
    .then((res)=>{
      this.setState({
        lat: res.location_suggestions[0].latitude,
        long: res.location_suggestions[0].longitude,
        locationVerified: true,
        loading: true,
        city: res.location_suggestions[0].title
      },()=>{this.getRests()});
    })
    .catch(()=>{
      this.setState({error: true})
    })
  }
  
  getRests = ()=>{
    
    const url2 = `https://developers.zomato.com/api/v2.1/search?lat=${this.state.lat}&lon=${this.state.long}`
    fetch(url2, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'user-key': keys.zomatoApiKey
      }
        })
      .then(res => res.json())
      .then((res)=>{
        this.setState({
          rests: res.restaurants
        });
      })
      .then(()=>{ this.stopLoading();})
      .catch(()=>{
        this.setState({error: true})
        this.stopLoading();
      })
  }
  stopLoading = ()=>{
    this.setState({loading: false, locationVerified: false})
  }
  handleLocationText = (e)=>{
    this.setState({locationText: e.target.value, locationVerified: false})
  }
  
  render() {
    const test = ' test';
    const renderRests = ()=>{
      
      if(this.state.rests.length === 0) {
        return <div>no Results</div>
      }
      else {
      return <div className="list-cont">{this.state.rests.map((rest, i)=>{
            return  <div class="list-block" index={rest.restaurant.id}>
                        <div className="list-item">
                        <img src={rest.restaurant.thumb.length > 0 ? rest.restaurant.thumb: 'https://via.placeholder.com/150'} alt="" className="thumb"/>
                        </div>
                        <div className="list-item">
                        <div class="title">{rest.restaurant.name}</div>
                        <div className="see-reviews"><Link to={`/reviews/${rest.restaurant.id}`}>See Reiews</Link></div>
                        </div>                                    
                    </div>
          })}</div>
      }
     
    }
   
    return <div>
            <div className="row">
                <div className="col s12"><h2>Search for Restaurant to Review</h2></div> 
           </div>
           
           <div className="row reviews-div">
             {/* dummy div */}
             <div className="col s0 m2 l3"></div>
                {/* Real Div */}
             <div className="col s12 m8 l6">
                      <div className="row">
                          <div className="col s10">
                            <div className="input-field">
                              <i className="material-icons prefix pencil">mode_edit</i>
                              <input 
                                  type="text" 
                                  name="location"
                                  id="searchTextField" 
                                  size="50" 
                                  // value={this.state.searchText} 
                                  onChange={(e)=>{this.handleLocationText(e)}}
                                  // className={`unopacified ${this.state.modalOpen ? "opacified": ""}`}
                              />
                              </div>
                              {/* Min Height Container */}
                              <div style={{minHeight: '100px'}}>
                                {this.state.locationText.length > 0 && !this.state.locationVerified ?
                                <button onClick={this.handleCheckLocation} type="button" className="btn waves-effect waves-light btn-small red" style={{margin: '10px 0'}}>Check Location</button>:<div></div>}
                              </div>
                              {this.state.locationVerified ? <h2 className="loading-text"><span>Displaying Reviews...<span></span></span></h2> : <div className="loading-text"><span>Displaying Reviews in {this.state.city}</span></div>}
                            </div>
                            <div className="col s2">
                              <i class={`material-icons check ${this.state.locationVerified ? 'checked':''}`}>check</i>
                            </div>


                                {/* Loading Bar */}
                               
                        </div>
              </div>
             {/* dummy div */}
             <div className="col s0 m2 l3"></div>
           </div>

              

          {/* Results */}
          <LoadingBar loading={this.state.loading}/>
            {renderRests()}
            
      

          {this.state.error ? <div>THERE IS AN ERROR</div>: <div></div>}
 

    </div>
  }
}

export default Reviews