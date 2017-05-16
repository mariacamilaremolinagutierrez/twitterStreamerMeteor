import React, { Component } from 'react';

export default class Overlay extends Component {
	constructor(props) {
		super(props);
		this.canvas = null;
	}

	componentWillUpdate(){
		this.drawTweets();
	}

	drawTweets() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
			var x; var y;

			this.props.tweets.map((tweet) => {
				var coords = tweet.coordinates;
				if (coords != null) {
					x, y = this.props.getProj(coords["coordinates"]);
					console.log("coordenadas tweet: "+x+" "+y)
					ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
		      ctx.fillRect(x, y, 10, 10);
				}
	    });
    }
  }


	render() {
		return (
			<div>
				<canvas id="canvas" width="600" height="600"></canvas>
			</div>);
	}
}
