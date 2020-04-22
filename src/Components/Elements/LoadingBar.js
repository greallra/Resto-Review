import React, { Component } from 'react'

export default class LoadingBar extends Component {
    render() {
      const display = this.props.loading ? {display : 'block'}:{display : 'none'}
        return (
          <div className="loading" style={display}>
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
        )
    }
}