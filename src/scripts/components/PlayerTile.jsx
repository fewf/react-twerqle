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
                    console.log('dragged start');
                    console.log(event.target);
                    var target = event.target;

                    target.classList.add("dragged-tile");

                    var ph = document.createElement('li');
                    ph.setAttribute('id', 'placeholder');
                    ph.classList.add('player-tile', 'hovered');

                    target.parentNode.insertBefore(ph, target);
                    // comp.props.playerTileSelect(comp);
                    // var target = event.target
                    // target.style.width = 0;

                    // var placeholder = document.createElement('li');
                    // placeholder.className = "player-tile"
                    // placeholder.id = "placeholder";

                    // target.parentNode.insertBefore(placeholder, target.nextSibling);
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
                    console.log(event.target);
                    event.target.classList.remove("dragged-tile");
                    var target = event.target;
                    // remove translation
                    target.style.webkitTransform =
                    target.style.transform = "";
                    // target.style.width = "50px";
                    // update the posiion attributes
                    target.removeAttribute('data-x');
                    target.removeAttribute('data-y');
                    var placeholder = document.getElementById("placeholder");
                    placeholder.parentNode.removeChild(placeholder);

                }
            })
            .dropzone({
                // only accept elements matching this CSS selector
                accept: '.player-tile',
                // Require a 75% element overlap for a drop to be possible
                overlap: 'pointer',

                // listen for drop related events:

                ondropactivate: function (event) {
                    console.log('drop activate');
                    console.log(event.target);
                    // add active dropzone feedback

                },
                ondragenter: function (event) {
                    console.log('dragenter');

                    console.log(event.target);
                    document.getElementById('placeholder').style.display = 'none';
                    event.target.classList.add('hovered');
                    // var placeholder = document.createElement("li");
                    // placeholder.className = "player-tile"
                    // placeholder.id = "placeholder";
                    // var placeholder = document.getElementById("placeholder");
                    // var target = event.target;
                    // target.parentNode.insertBefore(placeholder, target);
                    // target.parentNode.insertBefore(placeholder, target.nextSibling);
                },
                ondragleave: function (event) {
                    console.log('dragleave');

                    console.log(event.target);
                    event.target.classList.remove('hovered');
                    // var placeholder = document.getElementById("placeholder");
                    // placeholder.parentNode.removeChild(placeholder);
                },
                ondrop: function (event) {
                    console.log('drop');
                    console.log(event.target);

                    event.target.classList.remove('hovered');
                    var dragged = event.relatedTarget;
                    var dropped = event.target;
                    var rack = comp._owner;
                    var data = rack.state.orderedTiles.slice(0);
                    var from = Number(dragged.dataset.id);
                    var to = Number(dropped.dataset.id);
                    if(from < to) to--;
                    data.splice(to, 0, data.splice(from, 1)[0]);
                    // rack.setState({orderedTiles: data});
                    dropped.parentNode.insertBefore(dragged, dropped);
                },
                ondropdeactivate: function (event) {
                    console.log('drop deactivate');
                    // remove active dropzone feedback
                    // event.target.classList.remove('drop-active');
                    // event.target.classList.remove('drop-target');
                }
            });
    }
});

module.exports = PlayerTile;
