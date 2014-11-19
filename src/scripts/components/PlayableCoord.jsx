/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/PlayableCoord.css');

var PlayableCoord = React.createClass({
    render: function() {
        var cls = "playable-coord"
        cls += this.props.coords.x === 0 && this.props.coords.y === 0 ? " center" : "";
        var scale = this.props.cellSize/100;
        var translateX = this.props.coords.x * this.props.cellSize;
        var translateY = this.props.coords.y * this.props.cellSize;
        var transform = "translate(" + translateX + ", " + translateY + ")";
        transform += " scale(" + scale + ")";
        return (
                <rect 
                    transform={transform}
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    className={cls}
                    onClick={this.handleClick} />
            )
    },
    handleClick: function() {
        this.props.playableCoordClick(this);
    }
});

module.exports = PlayableCoord;
