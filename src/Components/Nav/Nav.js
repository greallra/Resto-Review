import React, { Component } from 'react'
import './Nav.css'
import WindowSizeListener from 'react-window-size-listener'

export default class Nav extends Component {
  state ={
    isMobScreen: false,
    windowSize: 900
  }
  componentDidMount() {
  
  }
  renderAppropriateNav = ()=>{
   
  }

  render() {
      return (
<div className="nav-cont">
    <div id="title">Resto Review</div>
        {this.state.windowSize.windowWidth > 600 ?
        <div className="desktop-items">
            <div>item 1</div>
            <div>item 1</div>
            <div>item 1</div>
        </div>
        :<div></div>
        }
   
    <div className="right-side">
        <div>Search Icon</div>
        <div>Burger</div>
    </div>
    <WindowSizeListener onResize={windowSize => {
      this.setState({windowSize})
    }}/>
</div>)
  }

}