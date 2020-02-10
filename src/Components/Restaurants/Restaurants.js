import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RestaurantList from '../RestaurantList/RestaurantList';
import './Restaurants.css';

class Restaurants extends Component {
  state = {
    visible: true,
    searchDivActive: false,
    searchButtonActive: false,
    locationSearchActive: false,
    loading: false,
    error: false,
    errorMessage: "",
    lat: null,
    long: null,
    cityName: null,
    entity_id: null, 
    countryName: null,
    restsListActive: false,
    restsFound: 0,
    restsList: [],
    inputLocation: "",
  }


  currentLocationSearch =(e)=>{
    //set loading state
    this.setState({loading: true});
      const geolocation = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => { resolve(position.coords) },
          error => { reject(error) }
        )
      })
      .then((res)=>{
          this.setState({
                  lat: res.latitude,
                  long: res.longitude
            },()=>{
              this.listRestaurantInGivenLocation();        
            });
      })
      .catch((error)=>{
          alert(error);
          this.setState({error: true, loading: false});
      });
      //Get restaurants in this area
        //set loading state
      this.setState({loading: true});
  }

  searchRestaurants = (location)=>{
    // Next Api Searc: Restaurants
    let url;
    // location = "Dublin"
    url = `https://developers.zomato.com/api/v2.1/locations?query=${location}&user-key=f7a5b883bef34e0148437a909b393a96`;
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'user-key': 'f7a5b883bef34e0148437a909b393a96'
      }
    })
    .then((res)=>{
      if(res.status !== 200) {
          this.setState({error: true, errorMessage: res.status, loading: false});
          alert("error in then : status")
      } else {
          return res.json();
      }
    })
    .then((res)=>{
      console.log("res", res);
      //Check which results set we got: /locations ir /searc
      if(res.location_suggestions){
        this.setState({
          error: false, 
          lat: res.location_suggestions[0].latitude, 
          long: res.location_suggestions[0].longitude, 
          cityName:   res.location_suggestions[0].city_name,
          countryName: res.location_suggestions[0].country_name,
          loading: false
        }, ()=>{this.listRestaurantInGivenLocation();});
      }
    })
    .catch((err)=>{
      console.log(err); 
      this.setState({error: true, errorMessage: "error setting state with repsonse", loading: false});
      alert("catch err 1")
    })
  }

  listRestaurantInGivenLocation = ()=>{
    const url = `https://developers.zomato.com/api/v2.1/search?lat=${this.state.lat}&lon=${this.state.long}`;

    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'user-key': 'f7a5b883bef34e0148437a909b393a96'
      }
    })
    .then((res)=>{
      if(res.status !== 200) {
          this.setState({error: true, errorMessage: res.status, loading: false});
          alert("error in then : status listRestaurantInGivenLocation")
      } else {
          return res.json();
      }
    })
    .then((res)=>{
      console.log("res", res);
      //Check which results set we got: /locations ir /searc
      if(res.results_found){
        this.setState({
          error: false,
          restsFound: res.results_found,
          restsList: res.restaurants,
          restsListActive: true,
          loading: false
        });
      }
    })
    .catch((err)=>{
      console.log(err); 
      this.setState({error: true, errorMessage: "error setting state with repsonse", loading: false});
      alert("catch err 1")
    })
  }

  customSearch =(perform)=>{
      this.setState({searchDivActive: true}); 
      if(perform === "perform"){
        this.searchRestaurants(this.state.inputLocation);
      }
  }
  cancelSearch =()=>{
      this.setState({searchDivActive: false, inputLocation: "", searchButtonActive: false}); 
  }
  handleLocationInput = (e)=>{
    this.setState({inputLocation: e.target.value, searchButtonActive: true});
  }
  activateRestaurantList = ()=>{
    this.setState({restsListActive: true})
  }

  render() {
    const styles = { display: this.state.visible ? 'block' : 'none'}
    const loading = { display: this.state.loading ? 'block' : 'none' }
    const error = { display: this.state.error ? 'block' : 'none' }
    const searchDivActive = { display: this.state.searchDivActive ? 'block' : 'none' }
    const searchButtonActive = { display: this.state.searchButtonActive ? 'block' : 'none' }
    return <div>
              {this.state.restsListActive ? <RestaurantList restsList={this.state.restsList}></RestaurantList> : <div>
              <div onClick={(e)=>{this.currentLocationSearch(e)}}><h1>Find Restaurant In Your Current Location</h1> </div> <br />
                <div><h1 onClick={(e)=>{this.customSearch(e)}}>Search for Restaurants</h1> 
                  {this.state.searchDivActive ? 
                  <div style={searchDivActive} className="locationInput">
                    <input type="text" placeholder="Enter Location" value={this.state.inputLocation} onChange={(e)=>{this.handleLocationInput(e);}}/>
                    <span onClick={this.cancelSearch}>x</span>
                    <button style={searchButtonActive} onClick={()=>{this.customSearch("perform")}}>Search Restaurants</button>
                  {this.state.locationSearchActive ? <div>{this.state.city}, {this.state.countryName} Is this correct? : <span onClick={this.activateRestaurantList}>yes</span><span onClick={this.cancelSearch}>no</span></div>:<div></div>}
                  </div>: 
                  <div></div>}
                </div>
              </div>}
              
              {/* Errors */}
              <div style={loading}>Loading...</div>
              <div style={error}></div>
    </div>
  }
}

export default Restaurants
