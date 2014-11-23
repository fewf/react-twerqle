/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Tile.css');

var Tile = React.createClass({
    getShape: function(shape, fillColor) {
        return [
            (<ellipse fill={fillColor} ry="40.25" rx="40.25" id="svg_9" cy="50" cx="50" />),
            (<rect fill={fillColor} height="70" width="70" y="15" x="15" />),
            (<path fill={fillColor} d="m5.33,39.70l34.26,0l10.58,-32.54l10.58,32.54l34.26,0l-27.71,20.11l10.58,32.54l-27.71,-20.11l-27.71,20.11l10.58,-32.54l-27.71,-20.11z" />),
            (<path fill={fillColor} d="m9.61,85.76l40.44,-70.78l40.44,70.78z" />),
            (<path fill={fillColor} d="m8.21,49.92l41.97,-42.35l41.97,42.35l-41.97,42.35l-41.97,-42.35z" />),
            (<path fill={fillColor} d="m5.12,34.66l29.70,0l0,-29.70l30.46,0l0,29.70l29.70,0l0,30.46l-29.70,0l0,29.70l-30.46,0l0,-29.70l-29.70,0l0,-30.46z" />)
        ][shape];
    },  
    render: function() {
        var colors = ['green', 'blue', 'red', 'yellow', 'orange', 'purple'];
        var squareFill = colors[app.game.getColor(this.props.tile)];

        var shapeFill = this.props.selected ? "white" : (this.props.isExchangeTile ? "gray" : "black");
        var shape = this.getShape(app.game.getShape(this.props.tile), shapeFill);

        return (
            <g transform="scale(0.5)">
                <rect className="tileBg" x="0" y="0" rx="10" ry="10" width="100" height="100" fill={squareFill} />
                {shape}
            </g>
        );
    }
});

module.exports = Tile;
