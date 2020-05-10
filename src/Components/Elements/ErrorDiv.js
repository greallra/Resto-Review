import React, { Component } from 'react';
import './ElementsStyles.css';
import {withRouter, Link } from 'react-router-dom';

const WR = withRouter(props => <ErrorDiv  {...props}/>);

function ErrorDiv(props) {
 
    const { errorMsg } = props 
    console.log("errorMsg", errorMsg);
    return <div className="errorDiv">
        <h2>{errorMsg}</h2>
            <Link to={"/restaurants"}>Try Again?</Link>
        </div>
}

export default ErrorDiv;