import React, { Component } from 'react'
import './Nav.css'
import WindowSizeListener from 'react-window-size-listener';
import TextInput from '../Elements/TextInput';
import {  Link } from "react-router-dom";
import SearchResults from '../SearchResults/SearchResults';

export default class Nav extends Component {
  state ={
    isMobScreen: false,
    windowSize: 900,
    activePage: 'home',
    searchActive: false,
    searchVal: ""
  }
  componentDidUpdate() {
    console.log("this.state.searchVal.length", this.state.searchVal.length);
    
  }
  toggleSearch = ()=>{
    this.setState({searchActive: !this.state.searchActive})
  }
  handleSideNavToggle = ()=>{
    this.props.changeSideNavState()

  }
  handleSearchInput = (e)=>{
    this.setState({searchVal: e.target.value, loading: true})
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
        {this.state.windowSize.windowWidth > 900 ? <i className="material-icons" style={{marginLeft: 'auto', marginRight: '5px'}} onClick={this.toggleSearch}>search</i> : <i></i>}
        {this.state.windowSize.windowWidth > 900 ? <TextInput searchActive={this.state.searchActive} handleSearchInput={this.handleSearchInput}/> : <div></div>}
        {this.state.windowSize.windowWidth < 600 ? <i className="material-icons menu" onClick={this.handleSideNavToggle}>menu</i>: <i></i>}
        {this.state.searchActive ? <i className="material-icons" onClick={this.toggleSearch} style={{marginLeft: '5px'}}>close</i>: <i></i>}
        {this.state.searchVal.length === 0 ? <div></div> :<SearchResults searchText={this.state.searchVal}/> }
    </div>
    
    <WindowSizeListener onResize={windowSize => {
      this.setState({windowSize})
    }}/>
</div>)
  }

}