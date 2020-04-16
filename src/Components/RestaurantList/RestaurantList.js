import React, { Component } from 'react'
import {Link, withRouter } from 'react-router-dom';
import '../RestaurantList/RestaurantList.css'
import Map from '../MoreInfo/MapContainer';


const RestaurantList = withRouter(props => <RestaurantListNoRouter  {...props}/>);
class RestaurantListNoRouter extends Component {
  state = {
    visible: true,
    cuisineOption: "",
    diningOption: "",
    diningRating: 0,
    filteredList: undefined,
    test: undefined
  }

 handleClickedCuisine = (e)=>{
     let choice = e.target.value;
    if(choice === this.state.cuisineOption) {
        this.setState({cuisineOption : ""}, ()=>{this.filterRestList()})
    }else {
        this.setState({cuisineOption : choice}, ()=>{this.filterRestList()})
    }
    
 }

 handleClickedDining = (e)=>{
     let choice = e.target.value;
    if(choice === this.state.diningOption) {
        this.setState({diningOption : "", diningRating: 0}, ()=>{this.filterRestList()})
    }else {
        this.setState({diningOption : choice}, ()=>{
          this.filterRestList();
              //set dining value
              switch(this.state.diningOption){
                case "Cheap Eats" :
                this.setState({diningRating: 2})
                break;
                case "Mid Range":
                this.setState({diningRating: 4})
                break;
                case "Fine Dining":
                this.setState({diningRating: 5})
                break;
                default:
                  break;
              } 
        })
    }
   
 }
 handleFilterReset = ()=>{
   this.setState({filteredList: undefined})
 }

 filterRestList = ()=>{
   //Check 1 what's ticked and filter accordindly 2 Nothing ticked then empty array
    let filtered;
    let cuisineOption = this.state.cuisineOption;
    let diningOption = this.state.diningOption;
    let diningRating = this.state.diningRating;
    
  // No Cusine or Dining Filters = []
   if(!cuisineOption && !diningOption) {
    filtered = this.props.defaultRestsList;
    console.log("!cuisineOption && !diningOption", filtered);
   }
   // YES Cusine NO Dining
   else if(cuisineOption && !diningOption) {
    console.log(" before filter", this.props.defaultRestsList);
    filtered = this.props.defaultRestsList.filter((restObj)=>{
      if(restObj.restaurant.cuisines.toLowerCase().includes(cuisineOption.toLowerCase())){
          return restObj
      }  
     })
     console.log(" YES cuisineOption && !diningOption", filtered);
   }
  // NO Cusine YES Dining
   else if(!cuisineOption && diningOption) {
    filtered = this.props.defaultRestsList.filter((restObj)=>{
      if(diningOption === "Cheap Eats"){
          return restObj.restaurant.price_range === 2
      }  
      if(diningOption === "Mid Range"){
          return restObj.restaurant.price_range === 4
      }  
      if(diningOption === "Fine Dining"){
          return restObj.restaurant.price_range === 5
      }  
     })
     console.log("!cuisineOption &&  YES diningOption", filtered);
  // YES Cusine YES Dining
  }else if(cuisineOption && diningOption){
    console.log(" YES cuisineOption && YES diningOption", filtered);
     filtered = this.props.defaultRestsList.filter((restObj)=>{
      if(restObj.restaurant.cuisines.toLowerCase().includes(cuisineOption.toLowerCase())){
          if(diningOption === "Cheap Eats" && restObj.restaurant.price_range > 0 && restObj.restaurant.price_range <=2 ){
            return restObj
          }     
          else if(diningOption === "Mid Range" && restObj.restaurant.price_range > 2 && restObj.restaurant.price_range <=4 ){
            return restObj
          }     
          else if(diningOption === "Fine Dining" && restObj.restaurant.price_range === 5){
            return restObj
          }     
      }  
     })
   }
   console.log("helo???", filtered);
   
     this.setState({filteredList: filtered}, ()=>{this.mapRests()})
 }

 mapRests = ()=>{
    //Default Loads Props
    if(this.state.filteredList !== undefined) {
        return this.state.filteredList.map((restObject, index)=>{
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
    //or else always render filtered
    else {
      return this.props.defaultRestsList.map((restObject, index)=>{
           return(<div className={`my-card-cont`} key={index}>
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
 mapLoading = ()=>{

   return  <div></div>
 }

 filterBar = ()=>{
   return <div className="filterbar">
   <div className="cuisine">
   <h4>Cuisine</h4>
    <form action="#">
            <p>
            <label>
                <input type="checkbox" 
                checked={this.state.cuisineOption == "Italian"}
                onClick={(e)=>{this.handleClickedCuisine(e)}}
                value="Italian"
                />
                <span>Italian</span>
            </label>
            <label>
                <input type="checkbox" 
                checked={this.state.cuisineOption == "American"} 
                onClick={(e)=>{this.handleClickedCuisine(e)}}
                value="American"
                />
                <span>American</span>
            </label>
            <label>
                <input type="checkbox" 
                checked={this.state.cuisineOption == "Irish"} 
                onClick={(e)=>{this.handleClickedCuisine(e)}}
                value="Irish"
                />
                <span>Irish</span>
            </label>
            <label>
                <input 
                id="indeterminate-checkbox" 
                type="checkbox" 
                checked={this.state.cuisineOption == "Spanish"}
                onClick={(e)=>{this.handleClickedCuisine(e)}}
                value="Spanish"
                />
                <span>Spanish</span>
            </label>
            <label>
                <input 
                value="Steak"
                type="checkbox" 
                onClick={(e)=>{this.handleClickedCuisine(e)}}
                checked={this.state.cuisineOption == "Steak"}  />
                <span>Steak</span>
            </label>
            <label>
                <input type="checkbox" 
                checked={this.state.cuisineOption == "Thai"} 
                onClick={(e)=>{this.handleClickedCuisine(e)}}
                value="Thai"
                />
                <span>Thai</span>
            </label>
            </p>
        </form>
       </div>
    <div className="dining-style">
       <h4>Dining Style</h4>
       <form action="">
         <p>
           <label>
               <input type="checkbox" 
               checked={this.state.diningOption == "Cheap Eats"}
               onClick={(e)=>{this.handleClickedDining(e)}}
               value="Cheap Eats"
               />
               <span>Cheap Eats</span>
           </label>
           <label>
               <input type="checkbox" 
               checked={this.state.diningOption == "Mid Range"}
               onClick={(e)=>{this.handleClickedDining(e)}}
               value="Mid Range"
               />
               <span>Mid Range</span>
           </label>
           <label>
               <input type="checkbox" 
               checked={this.state.diningOption == "Fine Dining"}
               onClick={(e)=>{this.handleClickedDining(e)}}
               value="Fine Dining"
               />
               <span>Fine Dining</span>
           </label>
         </p>
       </form>
      </div>
      <div onClick={this.handleFilterReset}>Reset Filters</div>
</div>
 }

  render() {
   
    const styles = { display: this.state.visible ? 'block' : 'none' }
    const restaurants = this.props.defaultRestsList.length > 0 ? this.mapRests(): this.mapLoading();
    return <div style={styles}>
        {/* <Link 
        onClick={this.props.history.goBack}
        className="waves-effect waves-light btn black link-goback">
          <span className="center-vertically">Back</span>
          </Link> */}
 
      {this.filterBar()}
      <div className="loading-text">Displaying Restaurants in {this.props.city}</div>
      <div className="rests-wrapper">
          {restaurants}
      </div>
    </div>
  }
}

export default RestaurantList

