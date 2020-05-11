import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import RestaurantList from '../RestaurantList/RestaurantList';
import './Restaurants.css';
import { keys } from '../../keys';
import LoadingBar from  '../Elements/LoadingBar';
import { Alert } from 'react-bootstrap';
import LoadingOverlay from  '../Elements/LoadingOverlay';
import ErrorDiv from '../Elements/ErrorDiv';
import Filter from '../Elements/Filter';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function SweetAlert(props) {

// }

const Restaurants = withRouter(props => <RestaurantsNoRouter  {...props}/>);
class RestaurantsNoRouter extends Component {
  state = {
    newSearch: false,
    loactionVerified: false,
    loading: false,
    preMountLoading: false,
    error: false,
    errorMessage: "",
    errorMessageUser: "",
    lat: null,
    long: null,
    cityName: "Dublin, Ireland",
    countryName: "",
    restsFound: 0,
    fullRestList: [],
    filterRestList: null,
    inputLocation: "",
    defaultLocation: true,
    cuisineOption: "",
    Italian: false,
    American: false,
    Irish: false,
    Spanish: false,
    Steak: false,
    Thai: false,
    CheapEats: false,
    MidRange: false,
    FineDining: false,
  }
  componentWillMount() {
    this.setState({preMountLoading: true});
  }
  componentDidMount() {
    if(this.state.defaultLocation) {
      this.defaultRestaurantsBrowserLocation();
    } 
  }
  defaultRestaurantsBrowserLocation =(e)=>{
    this.setState({loading: true});
      const geolocation = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => { resolve(position.coords) },
          error => { reject(error) }
        )
      })
      .then((res)=>{
        console.log("res.status", res);
        
          this.setState({
                  lat: res.latitude,
                  long: res.longitude
            },()=>{
              this.fetchRests();        
            });
      })
      .catch((error)=>{
          this.setState({error: true, loading: false});
      });
  }

  getNewLocation = ()=>{
    //set loading
    this.setState({loading: true})
    // Next Api Searc: Restaurants
    let url;
    let location = this.state.inputLocation
    url = `https://developers.zomato.com/api/v2.1/locations?query=${location}&user-key=f7a5b883bef34e0148437a909b393a96`;
    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'user-key': keys.zomatoApiKey
      }
    })
    .then((res)=>{
      if(res.status !== 200) {
          this.setState({error: true, 
            errorMessage: "error in getNewLocation", 
            errorMessageUser:"Sorry Couldnt get that location",
             loading: false});
      } else {
          return res.json();
      }
    })
    .then((res)=>{
      //Check which results set we got: /locations ir /searc
      console.log("getNewLocation", res);
      
      if(res.location_suggestions){
        this.setState({
          error: false, 
          lat: res.location_suggestions[0].latitude, 
          long: res.location_suggestions[0].longitude, 
          cityName:   res.location_suggestions[0].city_name,
          countryName: res.location_suggestions[0].country_name,
          loading: false,
          loactionVerified: true,
          newSearch: true
        }, ()=>{
          this.fetchRests();   
        });
      }
    })
    .catch((err)=>{
      console.log("err  getNewLocation", err);  
      this.setState({error: true, 
        errorMessage: "error setting state with repsonse",
        errorMessageUser: "Sorry, couldn't get that location",
        loading: false});
    })
  }

  fetchRests = ()=>{
    const url = `https://developers.zomato.com/api/v2.1/search?lat=${this.state.lat}&lon=${this.state.long}`;
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
      console.log("fetchRests results", res);
      
      if(res.results_found){
        this.setState({
          preMountLoading: false,
          restsFound: res.results_found,
          fullRestList: res.restaurants,
          loading: false,

        });
      }
    })
    .then(()=>{
      window.scroll({top: 700, left: 0, behavior: 'smooth' })
    })
    .catch((err)=>{
      this.setState({error: true, errorMessage: "Sorry,...", loading: false});

    })
  }

  cancelSearch =()=>{
      this.setState({inputLocation: "", loactionVerified: false}); 
  }

  handleLocationInput = (e)=>{
    this.setState({inputLocation: e.target.value, loactionVerified: false});
  }
  
  handleFilterOptions = (e)=>{
    console.log("handleFilterOptions", e.target.value);

  this.setState({[e.target.value]: !this.state[e.target.value]},()=>{this.filt()})
  }

  filt = ()=>{
    console.clear();
     //Check 1 what's ticked and filter accordindly 2 Nothing ticked then empty array
     let list = this.state.fullRestList

    let filterOptions = {
      cuisineOptions:[],
      diningOptions:[],
    }
     
     //check state for cuisine type
     let o = this.state
     let cusines = []
     for(let prop in o) {
      if(prop === "Italian" || prop === "American" || prop === "Irish" || prop === "Spanish" || prop === "Steak" ||prop === "Thai"){
        if(this.state[prop]) {
          filterOptions.cuisineOptions.push(prop)
        }
      }
      if(prop === "CheapEats"||prop === "MidRange"||prop === "FineDining") {
        if(this.state[prop]) {
          filterOptions.diningOptions.push(prop)
        }
      }
     }

     let filteredList = list.filter((o)=>{
      let toReturnOrNot = true;
      let cuisines = o.restaurant.cuisines.toLowerCase();
      let dining = o.restaurant.establishment[0];

      filterOptions.cuisineOptions.forEach((option)=>{
        if(cuisines.includes(option.toLowerCase())) {
          // console.log("if")
          // console.log("option", option.toLowerCase())
          // console.log("cuisines", cuisines)
          toReturnOrNot = true;
        }
        else {
          // console.log("else")
          // console.log("option", option.toLowerCase())
          // console.log("cuisines", cuisines)
          toReturnOrNot = false;
        }
      })
      return toReturnOrNot;

    })
    //  console.log("filter list", filteredList)
    //  console.log("normal list", list)
     this.setState({filterRestList: filteredList})
  }

  handleTryAgain = (e)=>{
    e.preventDefault();
    this.setState({error: false, errorMessage: ""})
  }

  render() {
   const newSearch = this.state.newSearch;
   const inputLocation = this.state.inputLocation
    
    const list = this.state.filterRestList ? this.state.filterRestList : this.state.fullRestList;
    console.log();
    if(this.state.preMountLoading) {return <div>
      <LoadingOverlay />
      <div className="loading-text" style={{padding:'80px', marginTop: '50px'}}>
        <span>Getting Restaurants in your location</span>
      </div>
      </div>}
    return <div className="" style={{padding: '10px'}}>
            <div className="row"><div className="col s12"><h2>Search for Restaurants</h2> </div></div>
            <div className="row">
              <div className="location-cont">
                    <div className="input-field">
                      <i className="material-icons prefix pencil">mode_edit</i>
                      <input type="text" name="location" id="searchTextField" size="50" placeholder="Enter a location" autocomplete="off"
                      value={inputLocation}
                      onChange={this.handleLocationInput}
                      />     
                    </div>
                    {inputLocation ? <i className="material-icons prefix pencil" onClick={this.cancelSearch}>close</i>:<i className="material-icons prefix pencil" onClick={this.cancelSearch} style={{visibility:'hidden'}}>close</i>}
              </div>
              <div className="check-cont">
                <i className={`material-icons check2 ${this.state.loactionVerified ? 'check2active':''}`}>check</i>
              </div>
            </div>
            {/* Search Button */}
           
            <div className="button-cont">
              <input 
              className="btn" 
              onClick={this.getNewLocation} 
              style={{background: '#d64b3e'}}
              disabled={!inputLocation}
              value={newSearch ? "New Search": "Search Restaurants"}
              type="button"
              />
            </div>

            {/* Padding */}
            <div style={{height: '20px'}}></div>
            {this.state.error ?<div key={1} className="alert danger" variant={'danger'}>{this.state.errorMessageUser} : <a id="try-again" onClick={this.handleTryAgain}>Try again ?</a></div>:
            <div>
              <Filter handleFilterOptions={this.handleFilterOptions}/>
              <RestaurantList
                rests={list} 
                city={this.state.cityName} 
                loading={this.state.loading}
              />
              </div>
            }
    </div>
  }
}

export default Restaurants
