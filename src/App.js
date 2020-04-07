import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from './Components/Home/Home';
import Restaurants from './Components/Restaurants/Restaurants';
import Reviews from './Components/Reviews/Reviews';
import RestaurantList from './Components/RestaurantList/RestaurantList';
import ReviewList from './Components/ReviewList/ReviewList';
import MoreInfo from './Components/MoreInfo/MoreInfo';
import Nav from './Components/Nav/Nav';
import SideNav from './Components/SideNav/SideNav';
import MyModal from './Components/MyModal/MyModal';

class App extends React.Component {
  state ={
    sideMenuActive: false
  }
  changeSideNavState = ()=>{
    this.setState({sideMenuActive: !this.state.sideMenuActive})
  }

  render(){
    return (
      <BrowserRouter>
      <div className="App">
        <Nav sideMenuActive={this.sideMenuActive}></Nav>
        <Switch>
            <Route path="/restaurants" exact>
              <Restaurants />
            </Route>
            <Route path="/restaurants/:dynamic">
              <MoreInfo />
            </Route>
            <Route path="/reviews">
              <Reviews />
            </Route>
            <Route path="/restaurants-list" exact>
              <RestaurantList />
            </Route>
            <Route path="/reviews-list">
              <ReviewList />
            </Route>
            <Route path="/">
              <Home />
            </Route>
         </Switch>
      </div>
      <SideNav changeSideNavState={this.changeSideNavState} />
      {/* <MyModal /> */}
  
      </BrowserRouter>)

}
  
}

export default App;
