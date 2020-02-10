import React, { Component } from 'react'

class RestaurantList extends Component {
  state = {
    visible: true
  }

 componentDidMount(){
   console.log(this.props);
   
 }

 mapRests = ()=>{
  //data structure of restList is results_found.restaurants array
   return this.props.restsList.map((restObject)=>{
     return <div>
      <p>{restObject.restaurant.name}</p>
      <p>{restObject.restaurant.location.address}</p>
     </div>
      
   })
 }
 mapErr = ()=>{

   return  <div>no</div>
 }


  render() {
    const styles = { display: this.state.visible ? 'block' : 'none' }
    const restaurants = this.props.restsList ? this.mapRests(): this.mapErr();
    return <div style={styles}>
      <h1>rest list </h1>
      {restaurants}

    
    <a href="http://localhost:3000/restaurants">Back</a>
    
    
    </div>
  }
}

export default RestaurantList

