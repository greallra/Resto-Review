import React, { Component } from 'react';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize';
import './Reviews.css';

class ReviewDetails extends Component {
    state = {
        totalReviews: 0,
        userReviews: []
    }
    componentDidMount() {
    const url = `https://developers.zomato.com/api/v2.1/reviews?res_id=${this.props.id}`
    const fetchOptions = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'user-key': 'f7a5b883bef34e0148437a909b393a96'
        }
    }
       fetch(url,fetchOptions)
        .then(res => res.json())
        .then((res)=>{
            console.log("le rez", res);
            this.setState({
                totalReviews: res.reviews_count,
                userReviews: res.user_reviews
            })
        })
        .catch((err)=> console.log(err))
    }

    render() {
        return <div>detail</div>
    }

}

export default ReviewDetails;