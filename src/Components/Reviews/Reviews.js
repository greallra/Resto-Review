import React, { Component } from 'react'

class Reviews extends Component {
  state = {
    visible: true
  }

 

  render() {
    const styles = { display: this.state.visible ? 'block' : 'none' }
    return <div style={styles}>reviews</div>
  }
}

export default Reviews