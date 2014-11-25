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
                    var target = event.target;

                    target.parentNode.classList.add("dragged-tile");
                    console.log('dragstart playertileselect');

                    // reset player tile selection and select tile
                    comp.props.playerTileDeselect();
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
                    // 'snap' tile back to rack

                    // note: would LOVE to do this instead as a CSS transition
                    // but because the drageffect is achieved by manipulating
                    // the element's attribute, that's not possible.

                    // note 2: managing the player tile selection relies on the
                    // fact that along with the drag events, the element's
                    // click event will be raised last, which will deselect 
                    // the dragged tile
                    var target = event.target;
                    target.parentNode.classList.remove("dragged-tile");
                    var intID = window.setInterval(
                        function(target, origX, origY, steps) {

                            var x = (parseFloat(target.getAttribute('data-x')));
                            var y = (parseFloat(target.getAttribute('data-y')));
                            // determine which step we're on by
                            // finding how many fractions have been removed
                            var step = Math.round(((origX - x) / origX) * steps) + 1;

                            if (step === steps) {
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
