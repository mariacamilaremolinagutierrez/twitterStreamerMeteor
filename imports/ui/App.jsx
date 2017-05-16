import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import Overlay from './Overlay.jsx';
import ColombiaMap from './ColombiaMap.jsx';
import { Tweets } from "../api/Tweets.js";

import '../../client/stylesheets/App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.projection = null;
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);
  }

  setProjection(newProj) {
    this.projection = newProj;
  }

  getProjection() {
    return this.projection;
  }

  render() {
    console.log("render!");
    return (
      <div className="fullWebsite">
        <h2>Tweets of Colombia</h2> <h4>by: <a href="https://mariacamilaremolinagutierrez.github.io">Maria Camila Remolina Gutiérrez</a></h4>

        <br />

        <div className="map">
          <ColombiaMap
            width="600"
            height="600"
            data={{RISARALDA:10, CALDAS:12}}
            setProj={this.setProjection.bind(this)}
          ></ColombiaMap>
        </div>

        <div className="mapCanvas">
          <Overlay
            tweets={this.props.tweets}
            getProj={this.getProjection.bind(this)}
          ></Overlay>
        </div>

        <div className="tweetsResults">
          <input type="text" className="form-control" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
          { this.props && this.props.err ?
            <div>Error: {this.props.err}</div> :
            <span></span>
          }
          {this.props && this.props.tweets ?
            <TweetsResults tweets={this.props.tweets}/> :
            <p>Enter a query</p>
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");

  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);
