/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var TilePlacement = require('./TilePlacement');
var PlayableCoord = require('./PlayableCoord');
var adaptor = require('../twerqle/adaptor');
require('../../styles/BoardSVG.css');

var BoardSVG = React.createClass({
    getInitialState: function() {
        var windowDims = adaptor.getScreenDims();
        var cellSize = this.props.cellSize;
        var maxDimensions = app.game ? 
                                (app.game.numTypes - 1)*app.game.numTypes*app.game.copies + 1
                                : 200;
        var svgLength = maxDimensions * cellSize;
        var centerCell = (svgLength - cellSize)/2;
        var transform = "translate(" + (centerCell) + ", " + (centerCell) + ")";
        var left = -1 * (svgLength/2 - windowDims.x/2);
        var top = -1 * (svgLength/2 - windowDims.y/2);

        return { 
                 left: left, 
                 top: top,
                 prevCellSize: this.props.cellSize,
                 maxDimensions: maxDimensions
               }
    },
    dragBoard: function(e) {

    },
    render: function() {
        var tilePlacements = this.props.tilePlacements.map(function(tp) {
            return (
                    <TilePlacement 
                        key={String(tp.tile) + tp.coords.x + tp.coords.y}
                        tilePlacement={tp}
                        cellSize={this.props.cellSize}
                        maxDimensions={this.state.maxDimensions} />
                );
        }, this);

        var playableCoords = this.props.playableCoords.map(function(pc) {
            return (
                    <PlayableCoord 
                        key={String(pc.x) + pc.y}
                        coords={pc}
                        cellSize={this.props.cellSize} 
                        maxDimensions={this.state.maxDimensions}
                        playableCoordClick={this.props.playableCoordClick}
                        playableCoordDragEnter={this.props.playableCoordDragEnter}
                        playableCoordDragLeave={this.props.playableCoordDragLeave} />
                )
        }, this);

        var cellSize = this.props.cellSize;
        var svgLength = this.state.maxDimensions * cellSize;
        var centerCell = (svgLength - cellSize)/2;
        var transform = "translate(" + (centerCell) + ", " + (centerCell) + ")";

        return (
            <svg id="boardSVG" 
                 xmlns="http://www.w3.org/2000/svg" 
                 version="1.1" 
                 width={svgLength} 
                 height={svgLength}
                 style={{top: this.state.top, left: this.state.left}}>
                <defs> 
                    <pattern id="grid" width={cellSize*2} height={cellSize*2} patternUnits="userSpaceOnUse">
                        <rect fill="LightGray" x="0" y="0" width={cellSize} height={cellSize} />
                        <rect fill="silver" x={cellSize} y="0" width={cellSize} height={cellSize} />
                        <rect fill="LightGray" x={cellSize} y={cellSize} width={cellSize} height={cellSize} />
                        <rect fill="silver" x="0" y={cellSize} width={cellSize} height={cellSize} />
                    </pattern>
                </defs>
                <g id="boardGroup">
                    <rect fill="url(#grid)" x="0" y="0" width="100%" height="100%" />
                    <g transform={transform}>
                        {tilePlacements}
                        {playableCoords}
                    </g>
                    <line x1="2275" y1="0" x2="2275" y2="4550" strokeWidth="00" stroke="red" />
                    <line x1="0" y1="2275" x2="4550" y2="2275" strokeWidth="00" stroke="red" />
                </g>

            </svg>
        );
    },
    componentDidMount: function() {
        // var comp = this;
        // $(this.getDOMNode()).draggable({
        //     stop: function(e, ui) {
        //         comp.setState({left: ui.position.left, 
        //                        top: ui.position.top});
        //     }
        // });
    },
    componentWillReceiveProps: function(nextProps) {
        var windowDims = adaptor.getScreenDims();
        var wh = windowDims.y;
        var ww = windowDims.x;
        var top = wh/2 - ((wh/2 - this.state.top) * (nextProps.cellSize/this.props.cellSize));
        var left = ww/2 - ((ww/2 - this.state.left) * (nextProps.cellSize/this.props.cellSize));
        this.setState({left: left, top: top});
    }
});

module.exports = BoardSVG;
