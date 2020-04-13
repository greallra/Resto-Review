import React from 'react';
import './SideNav.css';
import {  Link } from "react-router-dom";

class SideNav extends React.Component {
    state = {
        dropDownOpen: false
    }

    handleNavToggle = ()=>{
        
        this.props.changeSideNavState();
    }
    handleDropdown = ()=>{
        this.setState({dropDownOpen: !this.state.dropDownOpen})
    }
    styleIt = ()=>{
        // if(sideNavActive) {
            
            
        // }
    }

    render(){
        return <div 
        className={`sideNav ${this.props.sideNavActive ? 'sideNavActive':''}`}>
            <div className="close-cont sideNavActive">
                <div onClick={this.handleNavToggle} className="close">Close</div>
                <i className="material-icons" onClick={this.handleNavToggle}>close</i>  
            </div> 

            <div className="drop-down-lower">
                <div><Link to={'/'} onClick={this.handleNavToggle}>Home</Link> </div>
                <div><Link to={'/reviews'} onClick={this.handleNavToggle}>Reviews</Link> </div>
                <div><Link to={'/restaurants'} onClick={this.handleNavToggle}>Restaurants</Link> </div>
               
            </div>

            <div className="header-cont">
                <header onClick={this.handleDropdown}><a>See More</a><i className="material-icons" >arrow_drop_down</i></header>
                <ul className={`drop-down ${this.state.dropDownOpen ? 'drop-down-open':''}`}>
                   <li><Link to={'/restaurants'}>Restaurants</Link></li>
                   <li><Link to={'/reviews'}>Reviews</Link></li>
                </ul>
            </div>

            <div className="sideNavFooter">
                <h5>Follow us on</h5>
                <i className="material-icons">menu</i>
                <i className="material-icons">menu</i>
                <i className="material-icons">menu</i>
                <i className="material-icons">menu</i>
            </div>
    </div>
    }
}
export default SideNav;