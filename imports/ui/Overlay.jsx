import React, { Component } from 'react';

export default class Overlay extends Component {
	constructor(props) {
		super(props);
		this.canvas = null;
	}

	componentWillUpdate(){
		this.drawTweets();
	}

	clearCanvas(){
		var canvas = this.canvas;
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	drawTweets() {
    var canvas = this.canvas;
		var proj = this.props.getProj();

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

			var latlon_coords;
			var xy_coords;

			this.props.tweets.map((tweet) => {
				var coords = tweet.coordinates;
				if (coords != null) {
					latlon_coords = coords["coordinates"];
					xy_coords = proj(latlon_coords);
					//console.log("lat lon tweet: "+latlon_coords);
					//console.log("coordenadas tweet: "+xy_coords);
					ctx.fillStyle = 'rgba(64, 153, 255, 0.5)';
		      ctx.fillRect(xy_coords[0], xy_coords[1], 6, 6);
				}
	    });
    }
  }


	render() {
		return (
			<div>
				<canvas id="canvas" ref={(canvas)=>{this.canvas=canvas}} width="600" height="600"></canvas>
			</div>);
	}
}
