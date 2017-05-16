import React, {Component} from "react";
import { Meteor } from "meteor/meteor";

import '../../client/stylesheets/Tweet.css';

export default class Tweet extends Component {
  render() {
    return (
      <div className="tweet">
        <div className="row">
          <div className="col-md-4">
            <img className="tweet_profile_pic" src={this.props.tweet.user.profile_image_url} alt={this.props.tweet.user.screen_name + "profile image"}></img>
          </div>
          <div className="col-md-8">
            <div className="tweet_text">
              <p><a href={"https://twitter.com/"+this.props.tweet.user.screen_name}> @{this.props.tweet.user.screen_name} </a></p>
              <p> {this.props.tweet.text} </p>
              <p> Date: {this.props.tweet.created_at} </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
