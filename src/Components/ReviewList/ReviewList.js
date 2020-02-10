import React, { Component } from 'react'

class ReviewList extends Component {
  state = {
    visible: true
  }

 

  render() {
    const styles = { display: this.state.visible ? 'block' : 'none' }
    return <div style={styles}>review list.</div>
  }
}

export default ReviewList