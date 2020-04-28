import React, { Component } from 'react'
import ReactLoader from '../Elements/ReactLoader';
import {  Link } from "react-router-dom";

export default class SearchResults extends Component {
    state = {
        text: "",
        data: [{page: 'home'}, {page: 'restaurants'}, {page: 'reviews'}],
        matches: []
    }
    componentDidMount() {
        this.setState({text: this.props.searchText},()=>{
            this.checkForMatches()
        })

        setTimeout(()=>{
            if(this.state.matches.length === 0){
                this.setState({timeOut: true});
            }
        },5000)
    }
    checkForMatches = ()=> {
        const filtered = this.state.data.filter((o)=>{
            return o.page.startsWith(this.state.text)
        })
       this.setState({matches: filtered})     
    }
    render() {
        const display = ()=>{
            if(this.state.timeOut) {
                return <h4>no results found</h4>
            }else {
                return <ReactLoader />
            }
        }
        const style = {
            background: 'rgba(250,250,250,0.9)',
            color: 'black',
            width: '100%',
            position: 'absolute',
            top: '48px',
        }
        const ulStyle = {
            padding: '0'
        }
        const liHeader = {
            padding: '12px',
            textTransform: 'uppercase',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            textAlign: 'center',

        }
        const liStyle = {
            padding: '10px',
            textTransform: 'capitalize',
            textDecoration: 'underline',
            cursor: 'pointer'
        }
        const aStyle = {
            color: 'black'
        }
        return <div style={style}>
            <ul style={ulStyle}>
                <li style={liHeader}>Results Found: </li>
                {this.state.matches.length === 0 ? display():
                <div>
                    {this.state.matches.map((o)=>{
                        return <li style={liStyle}><Link to={`/${o.page}`} style={aStyle}>- {o.page}</Link></li>
                    })}
                </div>
                }
               
            </ul>
        </div>
    }

}