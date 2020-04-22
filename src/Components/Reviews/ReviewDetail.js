import React, { Component } from 'react';
import './ReviewDetail.css';
import {keys} from '../../keys.js';
import { withRouter } from 'react-router-dom';
import RatingSpans from '../Elements/RatingSpans';

const HocWithRouter = withRouter(props => <ReviewDetails  {...props}/>);
class ReviewDetails extends Component {
    state = {
        totalReviews: 0,
        user_reviews: [],
        featured_image: "",
        name: ""
    }
    componentDidMount() {

        const url = `https://developers.zomato.com/api/v2.1/reviews?res_id=${this.props.match.params.dynamo}`
        const fetchOptions = {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'user-key': keys.zomatoApiKey
            }
        }
       fetch(url,fetchOptions)
        .then(res => res.json())
        .then((res)=>{
            this.setState({
                totalReviews: res.reviews_count,
                user_reviews: res.user_reviews
            })
        })
        .then(this.secondCall())
        .catch((err)=> alert(err))
    }
    getReviews = ()=>{
        return <ul>
        {this.state.user_reviews.map((o)=>{

        return <li className="reviewDetailLi">
                <div className="profile"><span><img src={o.review.user.profile_image} alt="hey" id="profile_image"/></span><span>{o.review.user.name}</span></div>
                <div className="review-info">
                    <div className="top-col"><span><RatingSpans rating={o.review.rating}/></span><span>{o.review.timestamp}</span><span>Device</span></div>
                    <h5>Comments: </h5>
                    <p className="rating_text">"{o.review.rating_text}"</p>
                    <div className="bottom-col"><p><i class="fa fa-thumbs-up"></i> : {o.review.likes}</p><p>{o.review.review_time_friendly}</p></div>
                </div>
            </li>     
            })}
       </ul>
    }
    secondCall = ()=>{
        const fetchOptions2 = {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'user-key': keys.zomatoApiKey
            }
        }
        const url2 = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.props.match.params.dynamo}`
        fetch(url2,fetchOptions2)
        .then(res => res.json())
        .then(res=>{
            this.setState({
                name: res.name,
                featured_image: res.featured_image
            })
        })
        .catch(e=>{alert(e)})
    }
    render() {
        return <div className="reviewDetailCont">
            <h3>{this.state.totalReviews} reviews of:</h3>
            <h4>{this.state.name}</h4>
            <div className="img-cont"><img src={this.state.featured_image} alt="hey" className="review-detail-img"/></div>
           
                {this.state.user_reviews.length > 0 ? this.getReviews(): <div></div>}
             
       
        </div>
    }

}

export default HocWithRouter;