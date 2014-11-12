/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Tile = require('./Tile');
require('../../styles/TilePlacement.css');

var TilePlacement = React.createClass({
    render: function() {
        var tile = this.props.tilePlacement.tile;
        var scale = this.props.cellSize/50;
        var translateX = this.props.tilePlacement.coords.x * this.props.cellSize;
        var translateY = this.props.tilePlacement.coords.y * this.props.cellSize;
        var transform = "translate(" + translateX + ", " + translateY + ")";
        transform += " scale(" + scale + ")";
        return (
                <g className="tile" transform={transform}>
                    <Tile tile={tile} />
                </g>
            )
    }
});

module.exports = TilePlacement;
