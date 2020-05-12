import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Restaurants from './Components/Restaurants/Restaurants';
import Reviews from './Components/Reviews/Reviews';
import RestaurantList from './Components/RestaurantList/RestaurantList';
import ReviewDetail from './Components/Reviews/ReviewDetail';
import MoreInfo from './Components/MoreInfo/MoreInfo';
import Nav from './Components/Nav/Nav';
import SideNav from './Components/SideNav/SideNav';

class App extends React.Component {
  state ={
    sideNavActive: false
  }
  changeSideNavState = ()=>{
    this.setState({sideNavActive: !this.state.sideNavActive})
  }
  componentDidMount() {
  
  }
  render(){
    return (
      <BrowserRouter>
        <Nav changeSideNavState={this.changeSideNavState} sideNavActive={this.state.sideNavActive}></Nav>
        <div className={`App ${this.state.sideNavActive ? 'overlayActive':''} `}>
        <Switch>
            <Route path="/restaurants" exact>
              <Restaurants />
            </Route>
            <Route path="/restaurants/:dynamic">
              <MoreInfo />
            </Route>
            <Route path="/restaurants-list" exact>
              <RestaurantList />
            </Route>
            <Route path="/reviews" exact>
              <Reviews />
            </Route>
            <Route path="/reviews/:dynamo">
              <ReviewDetail />
            </Route>
            <Route path="/">
              <Home />
            </Route>
         </Switch>
      </div>
      <div className={`${this.state.sideNavActive ? 'overlay':''}`}></div>
      <SideNav changeSideNavState={this.changeSideNavState} sideNavActive={this.state.sideNavActive}/>
      {/* <MyModal /> */}
  
      </BrowserRouter>)

}
  
}

export default App;
