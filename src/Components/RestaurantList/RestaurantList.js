import React, { Component } from 'react'
import {Link, withRouter } from 'react-router-dom';
import '../RestaurantList/RestaurantList.css'
import Map from '../MoreInfo/MapContainer';
import LoadingBar from '../Elements/LoadingBar';
import fakeMap from '../../fakeMap.jpeg'


const RestaurantList = withRouter(props => <RestaurantListNoRouter  {...props}/>);
class RestaurantListNoRouter extends Component {
  state = {
    diningRating: 0,
  }

 renderRests = ()=>{
   const list = this.props.rests

   if(list.length === 0) {
     return <div></div>
   }
   else {
        return list.map((restObject, index)=>{
          return (<div className={`my-card-cont`} key={index}>
          <div className="img-wrapper">
             <img src={restObject.restaurant.thumb}  alt=""/>
           </div>
           <div className="rest-name">
             <span className="name">{restObject.restaurant.name}</span> 
             <span><b className="food-type-title">Food Type:</b><span className="food-type-content"> {restObject.restaurant.cuisines}</span></span>
             <span><b className="rating">Rating:</b><span className="rating-value">{restObject.restaurant.user_rating.aggregate_rating}</span> </span>
           </div>
           <div className="map-wrapper">
             <Map lat={restObject.restaurant.location.latitude} long={restObject.restaurant.location.longitude}/>  
           </div>
           <div className="commentsRating-wrapper">  
             <span><span className="comments"> Comments:</span></span>
             <span>&quot;{restObject.restaurant.user_rating.rating_text}	&quot;</span>
             <span className="more-info"><Link to={`/restaurants/${restObject.restaurant.id}`}>More Info</Link></span>
             <span className="address"><span className="address-title">Address:</span> <span className="address-value">{restObject.restaurant.location.address}</span> </span> 
           </div> 
       </div>)
           })
    }
}

 

  render() {
      const rests = this.props.rests


    return <div>
      {rests.length === 0 ? <div>No rests to display</div>:
      <div>
        <div className="loading-text" style={{padding:'10px'}}><span>Displaying Restaurants in {this.props.city}</span></div>
        <div style={{height:'50px'}}></div>
        <LoadingBar loading={this.props.loading}/>
        <div className="rests-wrapper">
            {this.renderRests()}
        </div>
      </div>
      }
      
    </div>
  }
}

export default RestaurantList

