/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Tile = require('./Tile');
require('../../styles/PlayerTile.css');

var PlayerTile = React.createClass({
    id: function() {
        return "tile" + this.props.key;
    },
    render: function() {
        var selected = (this == this.props.selectedTile);
        var isExchangeTile = this.props.exchangeTiles && (this.props.exchangeTiles.indexOf(this) !== -1);
        return (
                <li 
                    id={this.id()}
                    data-id={this.props.id}
                    key={this.props.key} 
                    title="Drag me to the board."
                    className="player-tile" 
                    onClick={this.click} >
                    <svg version="1.1" width="50" height="50">
                        <Tile tile={this.props.tile} selected={selected} isExchangeTile={isExchangeTile} />
                    </svg>
                </li>
            );
    },
    click: function(e) {
        this.props.playerTileSelect(this);
    },
    dragStart: function(e) {
        this.props.playerTileDragStart(this);
        this.props.dragStart(e);
    },
    componentDidMount: function() {
        var comp = this;
        interact('#' + this.id())
            .draggable({
                // allow dragging of multple elements at the same time
                max: 1,

                onstart: function (event) {
                    comp.props.playerTileSelect(comp);
                },
                // call this function on every dragmove event
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
                },
                // call this function on every dragend event
                onend: function (event) {
                    var target = event.target;
                    // remove translation
                    target.style.webkitTransform =
                    target.style.transform = "";

                    // update the posiion attributes
                    target.removeAttribute('data-x');
                    target.removeAttribute('data-y');
                }
            })
            .dropzone({
                // only accept elements matching this CSS selector
                accept: '.player-tile',
                // Require a 75% element overlap for a drop to be possible
                overlap: 0.51,

                // listen for drop related events:

                ondropactivate: function (event) {
                    // add active dropzone feedback

                },
                ondragenter: function (event) {
                    // event.target.classList.add('hovered');
                },
                ondragleave: function (event) {
                    // event.target.classList.remove('hovered');
                },
                ondrop: function (event) {
                    var dragged = event.relatedTarget;
                    var dropped = event.target;
                    var rack = comp._owner;
                    var data = rack.state.orderedTiles.slice(0);
                    var from = Number(dragged.dataset.id);
                    var to = Number(dropped.dataset.id);
                    if(from < to) to--;
                    data.splice(to, 0, data.splice(from, 1)[0]);
                    rack.setState({orderedTiles: data});
                },
                ondropdeactivate: function (event) {
                    // remove active dropzone feedback
                    // event.target.classList.remove('drop-active');
                    // event.target.classList.remove('drop-target');
                }
            });
    }
});

module.exports = PlayerTile;
