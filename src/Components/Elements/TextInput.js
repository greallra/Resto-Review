import React, { Component } from 'react';
import './ElementsStyles.css';
const styleo = {
    margin: '0',
    height: '15px',
    width: '210px',
    color: '#fff',
    fontSize: '12px',
}


export default function TextInput(props) {
        let sA = props.searchActive;
        return <div class="">
        <input id="email" type="email" class={`validate ${sA ? '': 'vanish'}`} style={styleo}  onChange={(e)=>{props.handleSearchInput(e)}} autocomplete="off"/>
        </div>
             
  }
