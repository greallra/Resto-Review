import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import logo from './logo.png';

class Home extends Component {
  state = {
    visible: true
  }
  
  render() {
    const styles = { display: this.state.visible ? 'block' : 'none' }
    return <div style={styles} className="container">
              <h1 
              className="center-align homepage-h1">
           
              </h1>
              <div>
               <Link 
                to="/restaurants" 
                class="waves-effect waves-light btn red center-align link">
                <span className="center-vertically">Find Restaurants</span>
               </Link>
               <Link 
               to="/reviews" 
               className="waves-effect waves-light btn red center-align link">
                 <span className="center-vertically">Get Restaurant Reviews</span>
                </Link>
              </div>
                 
        
           
    </div>
  }
}

export default Home

// center-vertically
// center-vertically