import React, { Component } from 'react'
import './MyModal.css';

export default class MyModal extends Component {
    state ={
        modalOpen: true
    }
    closeModal = ()=>{
        this.setState({modalOpen: false})
    }
    render(){
        return (
        <div className={`my-modal ${this.state.modalOpen ? "my-modal-open": ""}`} >
           <div className={`my-modal-content ${this.state.modalOpen ?"my-modal-content-open": ""}`}>
             <h5>Do you accept cookies?</h5>
             <button onClick={this.closeModal}>yes</button>
             <button>No</button>
           </div>
    
         </div>)
    }
}