import React, { Component } from 'react'
import ReviewDetails from './ReviewDetails';
import data from './data';
const scrp = "https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=Paris&key=AIzaSyCnqBDH_kR_tvH3FyRekQ5exthVZ6MOSQk";


class Reviews extends Component {
  state ={
    locationText : "",
    locationVerified: false,
    zomatoKey:"f7a5b883bef34e0148437a909b393a96",
    error: false,
    lat: null,
    long: null,
    rests : [],
    loading: false
  }
  componentDidMount() {
   //set state with dummy data for now
   this.setState({rests: data})
  

      //clear input
      this.setState({locationText : ""})
      const goog = window.google
      let input = document.getElementById("searchTextField");
      
      const autoCompleteObject = new goog.maps.places.Autocomplete(input);
      
     // event listener on autocomplete
      autoCompleteObject.addListener('place_changed', ()=> {
          //get the inputted address predcited by using the event listener on autocomplete
          console.log("autoCompleteObject", autoCompleteObject);
          const newSearchValue=autoCompleteObject.gm_accessors_.place.ue.formattedPrediction
         
         
          this.setState({locationText: newSearchValue},()=>{})
      })
  }

  handleCheckLocation = (e)=>{

   //use location search to get lat long
   const url = `https://developers.zomato.com/api/v2.1/locations?query=${this.state.locationText}`
   fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'user-key': this.state.zomatoKey
    }
      })
    .then(res => res.json())
    .then((res)=>{
      this.setState({
        lat: res.location_suggestions[0].latitude,
        long: res.location_suggestions[0].longitude,
        locationVerified: true,
        loading: true
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
        'user-key': this.state.zomatoKey
      }
        })
      .then(res => res.json())
      .then((res)=>{
        console.log(res);
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
                        <span class="title">{rest.restaurant.name}</span>
                        </div>                                    
                    </div>
          })}</div>
      }
     
    }
   
    return <div>
            <div className="row">
                <div className="col s12"><h2>Search for Restaurant to Review</h2> </div> 
           </div>
           
           <div className="row">
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
                              {this.state.locationText.length > 0 && !this.state.locationVerified ?
                              <button onClick={this.handleCheckLocation} type="button" className="btn waves-effect waves-light btn-small red">Check Location</button>:
                              <div style={{height: '36px'}}></div>}
                              {this.state.locationVerified ? <h2 className="">Displaying Reviews </h2> : <div></div>}
                            </div>
                            <div className="col s2">
                              <i class={`material-icons check ${this.state.locationVerified ? 'checked':''}`}>check</i>
                            </div>


                        {/* Loading Bar */}
                        {this.state.loading ? <div class="progress">
                            <div class="indeterminate"></div>
                        </div>:<div></div>}
                        
                        </div>
              </div>
             {/* dummy div */}
             <div className="col s0 m2 l3"></div>
           </div>

              

          {/* Results */}
    
            {renderRests()}
     
      

          {this.state.error ? <div>THERE IS AN ERROR</div>: <div></div>}
 

    </div>
  }
}

export default Reviews