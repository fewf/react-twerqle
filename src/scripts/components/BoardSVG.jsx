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
        var game = this.props.game;
        var maxDimensions = (game.numTypes - 1)*game.numTypes*game.copies + 1;
        return {
            boardLength: maxDimensions,
            viewX: .5,
            viewY: .5,
            dragActive: true
        };
    },
    render: function() {
        var tilePlacements = this.props.game.tilePlacements().map(function(tp) {
            return (
                    <TilePlacement 
                        key={String(tp.tile) + tp.coords.x + tp.coords.y}
                        tilePlacement={tp}
                        cellSize={this.props.cellSize} />
                );
        }, this);

        var playableCoords = this.props.game.playable().map(function(pc) {
            return (
                    <PlayableCoord 
                        key={String(pc.x) + "-" + pc.y}
                        coords={pc}
                        cellSize={this.props.cellSize} 
                        playableCoordClick={this.props.playableCoordClick}
                        playableCoordDragEnter={this.props.playableCoordDragEnter}
                        playableCoordDragLeave={this.props.playableCoordDragLeave} />
                )
        }, this);

        var cellSize = this.props.cellSize;

        var pattern = (
            <pattern 
                id="grid" 
                width={cellSize*2}
                height={cellSize*2}
                patternUnits="userSpaceOnUse">
                <rect
                    fill="LightGray"
                    x="0"
                    y="0"
                    width={cellSize}
                    height={cellSize} />
                <rect
                    fill="silver"
                    x={cellSize}
                    y="0"
                    width={cellSize}
                    height={cellSize} />
                <rect
                    fill="LightGray"
                    x={cellSize}
                    y={cellSize}
                    width={cellSize}
                    height={cellSize} />
                <rect
                    fill="silver"
                    x="0"
                    y={cellSize}
                    width={cellSize}
                    height={cellSize} />
            </pattern>
        );

        return (
            <svg id="boardSVG" 
                 xmlns="http://www.w3.org/2000/svg" 
                 version="1.1" >
                <defs> 
                    {pattern}
                </defs>
                <g id="boardGroup">
                    <rect
                        fill="url(#grid)"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%" />
                    <g ref="boardObjects">
                        {tilePlacements}
                        {playableCoords}
                    </g>
                </g>

            </svg>
        );
    },
    componentDidMount: function() {
        var windowDims = adaptor.getScreenDims();
        var cellSize = this.props.cellSize;
        var boardLength = this.state.boardLength;

        var svgLength = boardLength * cellSize;

        var left = -1 * (svgLength/2 - windowDims.x/2);
        var top = -1 * (svgLength/2 - windowDims.y/2);

        var $board = this.getDOMNode();
        $board.style.left = left;
        $board.style.top = top;
        $board.style.width = $board.style.height = svgLength;

        this.centerBoardObjects(svgLength, cellSize);

        var comp = this;

        interact('#boardSVG').draggable({
            onmove: function (event) {
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.style.left) || 0) + event.dx,
                    y = (parseFloat(target.style.top) || 0) + event.dy;

                // translate the element
                target.style.left = x;
                target.style.top = y;

                var windowDims = adaptor.getScreenDims();
                var cy = windowDims.y/2;
                var cx = windowDims.x/2;
                    svgLength = comp.state.boardLength * comp.props.cellSize
                    viewX = (-1 * x + cx) /svgLength,
                    viewY = (-1 * y + cy) / svgLength;

                
                comp.setState({viewX: viewX, viewY: viewY, dragActive: true});

                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            onend: function(event) {
                // var windowDims = adaptor.getScreenDims();
                // var cy = windowDims.y/2;
                // var cx = windowDims.x/2;

                // var target = event.target,
                //     // keep the dragged position in the data-x/data-y attributes
                //     left = parseFloat(target.style.left),
                //     top = parseFloat(target.style.top),
                //     svgLength = comp.state.boardLength * comp.props.cellSize
                //     viewX = (-1 * left + cx) /svgLength,
                //     viewY = (-1 * top + cy) / svgLength;

                
                // comp.setState({viewX: viewX, viewY: viewY});                
            }
        });
    },
    componentDidUpdate: function(prevProps) {
        var windowDims = adaptor.getScreenDims();
        var cy = windowDims.y/2;
        var cx = windowDims.x/2;
        var cellSize = this.props.cellSize;
        var boardLength = this.state.boardLength;
        var svgLength = boardLength * cellSize;

        var $board = this.getDOMNode();
        $board.style.width = $board.style.height = svgLength;
        $board.style.left = -1 * svgLength * this.state.viewX + cx;
        $board.style.top = -1 * svgLength * this.state.viewY + cy;

        if (prevProps.cellSize !== this.props.cellSize) {
            this.centerBoardObjects(svgLength, cellSize);
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if (nextState.dragActive) {
            nextState.dragActive = false;
            return false;
        } else {
            return true;
        }
    },
    centerBoardObjects: function(svgLength, cellSize) {
        var centerCell = (svgLength - cellSize)/2;
        var transform = "translate(" + (centerCell) + ", " + (centerCell) + ")";
        var $boardObjects = this.refs.boardObjects.getDOMNode();
        $boardObjects.setAttribute("transform", transform);        
    }
});

module.exports = BoardSVG;
