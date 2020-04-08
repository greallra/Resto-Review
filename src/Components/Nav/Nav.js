import React, { Component } from 'react'
import './Nav.css'
import WindowSizeListener from 'react-window-size-listener'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default class Nav extends Component {
  state ={
    isMobScreen: false,
    windowSize: 900,
    activePage: 'home'
  }
  componentDidMount() {
  }

  handleSideNavToggle = ()=>{

    this.props.changeSideNavState()
  }
  handleActivePage = (e)=>{
    let target =  e.target.innerHTML;
    
    if(target=== "Home"){
      this.setState({activePage:'home'})
    }
    else if(target=== "Reviews"){
      this.setState({activePage:'reviews'})
    }
    else if(target=== "Restaurants"){
      this.setState({activePage:'restaurants'})
    }
  }

  render() {
      return (
<div className={`nav-cont ${this.props.sideNavActive ? 'nav-cont-darken':''}`}>
    <div id="title">Resto Review</div>

    {this.state.windowSize.windowWidth > 600 ?
    <div className="desktop-items">
        <Link 
          to="/"
          onClick={(e)=>{this.handleActivePage(e)}}
          className={this.state.activePage === 'home' ? 'activePage':''}>Home</Link> 
        <Link  
          to="/reviews"  
          onClick={(e)=>{this.handleActivePage(e)}}
          className={this.state.activePage === 'reviews' ? 'activePage':''}>Reviews</Link> 
        <Link 
           onClick={(e)=>{this.handleActivePage(e)}}
          className={this.state.activePage === 'restaurants' ? 'activePage':''} 
          to="/restaurants" >Restaurants</Link>  
    </div>
    :<div></div>
    }
   
    <div className="right-side">
        <i class="material-icons">search</i>
        {this.state.windowSize.windowWidth < 600 ? <i class="material-icons menu" onClick={this.handleSideNavToggle}>menu</i>: <i></i>}
    </div>
    <WindowSizeListener onResize={windowSize => {
      this.setState({windowSize})
    }}/>
</div>)
  }

}