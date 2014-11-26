/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/PlayerData.css');

var PlayerData = React.createClass({
        render: function () {
        var fill = this.props.active ? "green" : "black";
        var playerSVG = this.props.player.type ? (
                <svg height="32" width="32" fill={fill} >
                    <g transform="scale(1, .825)">
                        <polygon points="0,30 4,22 28,22 32,30"/>
                        <path d="M4,2v18h24V2H4z M26,18H6V4h20V18z"/>
                    </g>
                </svg>
            ) : (
                <svg height="32px" width="32px" fill={fill}>
                    <g transform="scale(1, .825)">                
                        <path d="M0,32h32v-8c0,0,0-4-4-4c-2,0-20,0-24,0s-4,4-4,4V32z"/>
                        <circle cx="16" cy="10" r="8"/>
                    </g>
                </svg>
            );

        var tiles = this.props.player.tiles.map(function(tile, i) {
            var y = i < 3 ? 0 : 10;
            var x = i < 3 ? i * 10 : (i - 3) * 10;
            return (
                <rect
                    width="8"
                    height="8"
                    x={x}
                    y={y}
                    fill="black"
                    stroke="none" />
            );
        });

        var tileCounters = (
                <a title={tiles.length + ' tiles remaining'}>
                    <svg
                        version="1.1"
                        className="tile-counters"
                        height="18"
                        width="30">
                        {tiles}
                    </svg>
                </a>
            );
        var winners = this.props.winners;
        var winner = this.props.winner ? (
                <svg
                    version="1.1"
                    height="210"
                    width="50">
                    <text
                        x="0"
                        y="0"
                        transform="rotate(90)"
                        fontSize="50">
                        WINNER
                    </text>

                </svg>
            ) : null;
        return (
            <div className={this.props.winner ? "winner" : ""}>

                {winner}
                {playerSVG}
                <p>{this.props.player.score}</p>
                {tileCounters}
            </div>
        );
    }
});

module.exports = PlayerData;
