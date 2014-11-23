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
                    data-id={this.props.id}
                    key={this.props.key} 
                    title="Drag me to the board."
                    className="player-tile" 
                    onClick={this.click} >
                    <svg id={this.id()} version="1.1" width="50" height="50">
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
                    console.log('dragged start');
                    var target = event.target;

                    target.parentNode.classList.add("dragged-tile");

                    comp.props.playerTileSelect(comp);
                },
                // call this function on every dragmove event
                onmove: function (event) {
                    // console.log('draggedmove');
                    // console.log(event.target);
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
                    console.log('draggedend');
                    event.target.parentNode.classList.remove("dragged-tile");
                    var target = event.target;
                    // remove translation
                    target.style.webkitTransform =
                    target.style.transform = "";
                    // target.style.width = "50px";
                    // update the posiion attributes
                    target.removeAttribute('data-x');
                    target.removeAttribute('data-y');


                }
            });
    }
});

module.exports = PlayerTile;
