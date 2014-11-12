/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/PlayableCoord.css');

var PlayableCoord = React.createClass({
    render: function() {
        var className = "playable-coord"
        className += this.props.coords.x === 0 && this.props.coords.y === 0 ? " center" : "";
        var scale = this.props.cellSize/100;
        var translateX = this.props.coords.x * this.props.cellSize;
        var translateY = this.props.coords.y * this.props.cellSize;
        var transform = "translate(" + translateX + ", " + translateY + ")";
        transform += " scale(" + scale + ")";
        return (
                <rect className="playableCoord" 
                      transform={transform}
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      className={className}
                      onClick={this.handleClick} 
                      onDragOver={this.dragOver}
                      onDragLeave={this.dragLeave}
                      onDragEnter={this.dragEnter} />
            )
    },
    handleClick: function() {
        this.props.playableCoordClick(this);
    },
    dragOver: function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    },                
    dragEnter: function(e) {
        this.props.playableCoordDragEnter(this, e);
    },
    dragLeave: function(e) {
        this.props.playableCoordDragLeave(this, e);
    }
});

module.exports = PlayableCoord;
