import React, { Component } from 'react'

export default class RatingSpans extends Component {
    render() {
        const x = []
        const getRating = ()=>{
            let rating = this.props.rating ? this.props.rating: 3
            let c = <div></div>
            for(var i =1;i <= 5; i++){
                if( i <= rating) {
                    x.push(<span className="fa fa-star checked"  key={i}></span>)
                }else {
                    x.push(<span className="fa fa-star"  key={i}></span>)
                }
              
            }
            return x
        }
        
        return (
          <div>
              {getRating()}
               
        </div>
        )
    }
}