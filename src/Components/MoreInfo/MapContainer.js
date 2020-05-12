import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react'
import './MapContainer.css';
import { keys } from '../../keys';
const mapStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '10%'

}
class MapContainer extends Component {

    componentDidMount() {
    
    }
  getRandomInRange = (from, to, fixed)=> {
      return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
      // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }
    render() {
      let lat = this.props.lat;
      let lng = this.props.long;
      let latLong;
      if(lat && lng){
        latLong = {
          lat: this.props.lat,
          lng: this.props.long
        }
      } else {
        latLong = {
          lat: 41.9028,
          lng: 12.4964
        }
      }
      
        return (
          // <Map
          // google={this.props.google}
          // zoom={15}
          // style={mapStyles}
          // initialCenter={latLong}
          // >
          // <Marker position={latLong} />

          // </Map>
          <img src={"https://via.placeholder.com/150"} alt="" id="fakeMap" style={mapStyles}/> 
        );
  }
}

export default GoogleApiWrapper({
    apiKey: keys.googleApiKey
  })(MapContainer);