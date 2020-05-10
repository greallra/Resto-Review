import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {
  render() {
    return <div className="container">
              <h1 
              className="center-align homepage-h1"> 
              </h1>
              <div>
               <Link 
                to="/restaurants" 
                className="waves-effect waves-light btn home-btn center-align link">
                <span className="center-vertically">Find Restaurants</span>
               </Link>
               <Link 
               to="/reviews" 
               className="waves-effect waves-light btn home-btn center-align link">
                 <span className="center-vertically">Get Restaurant Reviews</span>
                </Link>
              </div>  
    </div>
  }
}

export default Home
