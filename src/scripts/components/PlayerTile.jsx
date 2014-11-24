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
                    <svg 
                        id={this.id()}
                        className="player-tile-svg"
                        version="1.1"
                        width="50" 
                        height="50">
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
                onmove: function (event) {

                    var target = event.target;
                    // keep the dragged position in the data-x/data-y attributes
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // translate the element
                    target.style.webkitTransform =
                    target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                    // update the posiion attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                onend: function (event) {

                    var target = event.target;
                    target.parentNode.classList.remove("dragged-tile");

                    var intID = window.setInterval(
                        function(target, origX, origY, steps) {

                            var x = (parseFloat(target.getAttribute('data-x')));
                            var y = (parseFloat(target.getAttribute('data-y')));

                            var step = Math.round(((origX - x) / origX) * steps) + 1;

                            if (step === steps - 1) {
                                target.style.webkitTransform = 
                                target.style.transform =
                                    "";
                                target.removeAttribute('data-x');
                                target.removeAttribute('data-y');
                                window.clearInterval(intID);
                                return;
                            }

                            // increment or decrement coords toward 0
                            x = origX - (origX * (step/steps));
                            y = origY - (origY * (step/steps));
                            // translate the element
                            target.style.webkitTransform =
                            target.style.transform =
                                'translate(' + x + 'px, ' + y + 'px)';
                            // update the position attributes
                            target.setAttribute('data-x', x);
                            target.setAttribute('data-y', y);

                        }.bind(this, 
                               target, 
                               (parseFloat(target.getAttribute('data-x'))), 
                               (parseFloat(target.getAttribute('data-y'))),
                               50)
                    , 5);
                }
            });
    }
});

module.exports = PlayerTile;
