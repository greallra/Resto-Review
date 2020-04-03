import React, { Component } from 'react';

class SearchDiv extends Component {
 

    render() {
        const locationInput ={
            border: "1px solid #fafafa",
            padding: "100px"
        }
        const x ={
           cursor: "pointer"
        }
  
        const searchDivActive = { display: this.props.searchDivActive ? 'block' : 'none' }
        const searchButtonActive = { display: this.props.searchButtonActive ? 'block' : 'none', margin: "auto" }

        return (
         <div style={searchDivActive} style={locationInput}>
        <input type="text"
            placeholder="Enter Location" 
            value={this.props.inputLocation} 
            onChange={(e)=>{this.props.handleLocationInput(e);}}/>
        <span onClick={this.props.cancelSearch}><i class="tiny material-icons" style={x}>clear</i></span>
        <button 
            className="waves-effect waves-light btn grey darken-4"
            style={searchButtonActive} 
            onClick={()=>{this.props.customSearch("perform")}}>Search Restaurants</button>
      {this.props.locationSearchActive ? <div>{this.props.city}, {this.props.countryName} Is this correct? 
      : <span onClick={this.activateRestaurantList}>yes</span><span onClick={this.props.cancelSearch}>no</span></div>:<div></div>}
      </div>
      )
    }
}



export default SearchDiv;