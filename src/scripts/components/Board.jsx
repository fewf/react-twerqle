/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var BoardSVG = require('./BoardSVG');
require('../../styles/Board.css');

var Board = React.createClass({
    getInitialState: function() {
        return { cellSize: 50,
                 center: true };
    },
    zoomIn: function() {
        this.setState({cellSize: this.state.cellSize + 5});
    },
    zoomOut: function() {
        this.setState({cellSize: this.state.cellSize - 5});
    },
    moveLeft: function(e) {
        this.intervalId = window.setInterval(function() {
            var $board = this.refs.boardSVG.getDOMNode();
            var leftNum = Number($board.style.left.substr(0, $board.style.left.length - 2));
            $board.style.left = leftNum + 1;
        }.bind(this), 20);
    },
    killMove: function(e) {
        clearInterval(this.intervalId);
    },
    render: function() {
        var cellSize = this.state.cellSize;

        return (
            <div id="boardContainer">
                <BoardSVG cellSize={cellSize}
                          tilePlacements={this.props.tilePlacements}
                          playableCoords={this.props.playableCoords}
                          playableCoordClick={this.props.playableCoordClick}
                          playableCoordDragEnter={this.props.playableCoordDragEnter}
                          playableCoordDragLeave={this.props.playableCoordDragLeave}
                          minX = {this.state.minX} 
                          minY = {this.state.minY}
                          ref="boardSVG" />
                <div id="board-zoom">
                    <button disabled={cellSize >= 70 ? "disabled" : ""} onClick={this.zoomIn}>
                        <svg height="48" width="48">
                            <g transform="scale(0.5)">
                                <path d="M90.829,85.171L68.121,62.464C73.047,56.307,76,48.5,76,40C76,20.118,59.882,4,40,4C20.118,4,4,20.118,4,40s16.118,36,36,36  c8.5,0,16.306-2.953,22.464-7.879l22.708,22.708c1.562,1.562,4.095,1.562,5.657,0C92.391,89.267,92.391,86.733,90.829,85.171z   M40,68c-15.464,0-28-12.536-28-28s12.536-28,28-28c15.464,0,28,12.536,28,28S55.464,68,40,68z"/>
                                <path d="M52,36h-8v-8c0-2.209-1.791-4-4-4s-4,1.791-4,4v8h-8c-2.209,0-4,1.791-4,4s1.791,4,4,4h8v8c0,2.209,1.791,4,4,4s4-1.791,4-4  v-8h8c2.209,0,4-1.791,4-4S54.209,36,52,36z"/>
                            </g>
                        </svg>
                    </button>
                    <button disabled={cellSize <= 10 ? "disabled" : ""} onClick={this.zoomOut}>
                        <svg height="48" width="48">                       
                            <g transform="scale(0.5)">
                                <path d="M90.829,85.171L68.121,62.464C73.047,56.307,76,48.5,76,40C76,20.118,59.882,4,40,4C20.118,4,4,20.118,4,40s16.118,36,36,36  c8.5,0,16.306-2.953,22.464-7.879l22.708,22.708c1.562,1.562,4.095,1.562,5.657,0C92.391,89.267,92.391,86.733,90.829,85.171z   M40,68c-15.464,0-28-12.536-28-28s12.536-28,28-28c15.464,0,28,12.536,28,28S55.464,68,40,68z"/>
                                <path d="M56,40c0,2.209-1.791,4-4,4H28c-2.209,0-4-1.791-4-4l0,0c0-2.209,1.791-4,4-4h24C54.209,36,56,37.791,56,40L56,40z"/>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
            )
    }
});

module.exports = Board;
