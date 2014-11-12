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
                          minY = {this.state.minY} />
                <div id="boardControls">
                    <button disabled={cellSize >= 70 ? "disabled" : ""} onClick={this.zoomIn}>+</button>
                    <button disabled={cellSize <= 10 ? "disabled" : ""} onClick={this.zoomOut}>-</button>
                </div>
            </div>
            )
    }
});

module.exports = Board;
