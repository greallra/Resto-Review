import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import RestaurantList from '../RestaurantList/RestaurantList';
import './Restaurants.css';
import { keys } from '../../keys';


const Restaurants = withRouter(props => <RestaurantsNoRouter  {...props}/>);
class RestaurantsNoRouter extends Component {
  state = {
    visible: true,
    searchDivActive: false,
    searchButtonActive: false,
    locationSearchActive: false,
    loactionVerified: false,
    loading: false,
    error: false,
    errorMessage: "",
    lat: null,
    long: null,
    cityName: "Dublin, Ireland",
    entity_id: null, 
    countryName: "",
    restsFound: 0,
    restsList: [],
    inputLocation: "",
  }
  componentDidMount() {
    this.defaultRestaurantsBrowserLocation();
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
          this.setState({
                  lat: res.latitude,
                  long: res.longitude
            },()=>{
              this.renderRestaurants();        
            });
      })
      .catch((error)=>{
          this.setState({error: true, loading: false});
      });
 
   
  }

  handleGetlocation = ()=>{
    this.setState({loading: true},()=>{this.getLocation()})
  }

  getLocation = ()=>{
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
          this.setState({error: true, errorMessage: res.status, loading: false});
          alert("error in then : status")
      } else {
          return res.json();
      }
    })
    .then((res)=>{
      //Check which results set we got: /locations ir /searc
      if(res.location_suggestions){
        this.setState({
          error: false, 
          lat: res.location_suggestions[0].latitude, 
          long: res.location_suggestions[0].longitude, 
          cityName:   res.location_suggestions[0].city_name,
          countryName: res.location_suggestions[0].country_name,
          loading: false,
          loactionVerified: true
        }, ()=>{
          
          this.renderRestaurants();
        
        });
      }
    })
    .catch((err)=>{
      this.setState({error: true, errorMessage: "error setting state with repsonse", loading: false});
    })
  }

  renderRestaurants = ()=>{
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
      // this.setState({error: true, errorMessage: "error setting state with repsonse", loading: false});

    })
  }

  cancelSearch =()=>{
      this.setState({searchDivActive: false, inputLocation: "", searchButtonActive: false}); 
  }
  handleLocationInput = (e)=>{
    this.setState({inputLocation: e.target.value, searchButtonActive: true, loactionVerified: false});
  }
  setLoading = (val)=>{
      this.setState({loading: val})
  }


  render() {
    const styles = { display: this.state.visible ? 'block' : 'none'}
    const error = { display: this.state.error ? 'block' : 'none' }
   
    return <div className="">
            <div class="row"><div class="col s12"><h2>Search for Restaurants</h2> </div></div>
            <div class="row">
              <div className="location-cont">
                    <div class="input-field">
                      <i class="material-icons prefix pencil">mode_edit</i>
                      <input type="text" name="location" id="searchTextField" size="50" placeholder="Enter a location" autocomplete="off" 
                      onChange={(e)=>{this.handleLocationInput(e)}}
                      />        
                    </div>
                    <i class={`material-icons check2 ${this.state.loactionVerified ? 'check2active':''}`}>check</i>
              </div>

            </div>
            {/* Search Button */}
            <div className="button-cont">
              <button className="btn" onClick={this.handleGetlocation} style={{background: '#d64b3e'}}>Search Restaurants</button>
            </div>

            {/* Padding */}
              <div style={{height: '20px'}}></div>
            <RestaurantList defaultRestsList={this.state.restsList} city={this.state.cityName} setLoading={this.setLoading} loading={this.state.loading}/>

              {/* <Link 
                onClick={this.props.history.goBack}
                className="waves-effect black waves-light btn red">
                  <span className="">Back</span>
              </Link> */}
              
             

              <div style={error}></div>
              {/* Dummy Component */}
              {/* <Dummy restsList={data}></Dummy> */}
    </div>
  }
}

export default Restaurants
