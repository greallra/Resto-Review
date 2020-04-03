import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from './Components/Home/Home';
import Restaurants from './Components/Restaurants/Restaurants';
import Reviews from './Components/Reviews/Reviews';
import RestaurantList from './Components/RestaurantList/RestaurantList';
import ReviewList from './Components/ReviewList/ReviewList';
import MoreInfo from './Components/MoreInfo/MoreInfo';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
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
    </BrowserRouter>
  );
}

export default App;
