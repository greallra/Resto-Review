import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  state = {
    visible: true
  }

 

  render() {
    const styles = { display: this.state.visible ? 'block' : 'none' }
    return <div style={styles}>
        <Link to="/restaurants">Find Restaurants</Link> <br />
        <Link to="/reviews">Get Restaurant Reviews</Link>
    </div>
  }
}

export default Home