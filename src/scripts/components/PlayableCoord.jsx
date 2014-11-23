/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/PlayableCoord.css');

var PlayableCoord = React.createClass({
    id: function() {
        return "pc" + this.props.key;
    },
    render: function() {
        var cls = "playable-coord"
        cls += this.props.coords.x === 0 && this.props.coords.y === 0 ? " center" : "";
        var scale = this.props.cellSize/100;
        var translateX = this.props.coords.x * this.props.cellSize;
        var translateY = this.props.coords.y * this.props.cellSize;
        var transform = "translate(" + translateX + ", " + translateY + ")";
        transform += " scale(" + scale + ")";
        return (
                <rect 
                    id={this.id()}
                    transform={transform}
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    className={cls}
                    onClick={this.handleClick} />
            )
    },
    handleClick: function() {
        this.props.playableCoordClick(this);
    },
    componentDidUpdate: function() {
        var comp = this;
        interact('#' + this.id()).dropzone({
            // only accept elements matching this CSS selector
            accept: '.player-tile',
            // Require a 75% element overlap for a drop to be possible
            overlap: 0.51,

            // listen for drop related events:

            ondropactivate: function (event) {
                console.log('drop activate');
                // add active dropzone feedback
                event.target.classList.add('drop-active');
            },
            ondragenter: function (event) {
                console.log('drop enter');
                comp.props.playableCoordDragEnter(comp);
            },
            ondragleave: function (event) {

                console.log('drop leave');
                // remove the drop feedback style
                event.target.classList.remove('play-validated');
                // event.relatedTarget.classList.remove('can-drop');
            },
            ondrop: function (event) {
                comp.props.playableCoordClick(comp);
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            }
        });
    },
    componentDidMount: function() {

        
        var comp = this;
        interact('#' + this.id()).dropzone({
            // only accept elements matching this CSS selector
            accept: '.player-tile',
            // Require a 75% element overlap for a drop to be possible
            overlap: "pointer",

            // listen for drop related events:

            ondropactivate: function (event) {
                // add active dropzone feedback
                event.target.classList.add('drop-active');
            },
            ondragenter: function (event) {
                comp.props.playableCoordDragEnter(comp);
            },
            ondragleave: function (event) {
                // remove the drop feedback style
                event.target.classList.remove('play-validated');
                // event.relatedTarget.classList.remove('can-drop');
            },
            ondrop: function (event) {
                comp.props.playableCoordClick(comp);
            },
            ondropdeactivate: function (event) {
                // remove active dropzone feedback
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            }
        });
    }
});

module.exports = PlayableCoord;
