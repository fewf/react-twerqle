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
                        key={String(pc.x) + pc.y}
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

        var game = this.props.game;

        var maxDimensions = (game.numTypes - 1)*game.numTypes*game.copies + 1;
        var svgLength = maxDimensions * cellSize;
        var centerCell = (svgLength - cellSize)/2;
        var transform = "translate(" + (centerCell) + ", " + (centerCell) + ")";
        var left = -1 * (svgLength/2 - windowDims.x/2);
        var top = -1 * (svgLength/2 - windowDims.y/2);

        var $board = this.getDOMNode();
        $boardObjects = this.refs.boardObjects.getDOMNode();

        $board.style.left = left;
        $board.style.top = top;

        $board.style.width = $board.style.height = svgLength;
        $boardObjects.setAttribute("transform", transform);

        interact('#boardSVG').draggable({
            onmove: function (event) {
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // translate the element
                target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        });

        interact('.playable-coord').dropzone({
            // only accept elements matching this CSS selector
            accept: '.player-tile',
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.75,

            // listen for drop related events:

            ondropactivate: function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active');
            },
            ondragenter: function (event) {
                console.log('hi');
                var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;

                // feedback the possibility of a drop
                dropzoneElement.classList.add('drop-target');
                draggableElement.classList.add('can-drop');
            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
            },
            ondrop: function (event) {
                event.relatedTarget.textContent = 'Dropped';
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            }
        });
    }
});

module.exports = BoardSVG;
