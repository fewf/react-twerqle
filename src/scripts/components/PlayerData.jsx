/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/PlayerData.css');

var PlayerData = React.createClass({
  render: function () {
  	var fill = this.props.active ? "green" : "black";
  	var svg = this.props.player.type ? (        	
  			<svg height="32" width="32" fill={fill} >
        		<polygon points="0,30 4,22 28,22 32,30  "/>
        		<path d="M4,2v18h24V2H4z M26,18H6V4h20V18z"/>
        	</svg>
	        		) : (
			<svg height="32px" width="32px" fill={fill}>
				<path d="M0,32h32v-8c0,0,0-4-4-4c-2,0-20,0-24,0s-4,4-4,4V32z"/>
				<circle cx="16" cy="10" r="8"/>
			</svg>
        			)
    return (
        <div className="player-data">

        	{svg}
        	<p>{this.props.player.score}</p>
        	{this.props.winner ? (<p>WINNER</p>) : null}
        </div>
      );
  }
});

module.exports = PlayerData;
