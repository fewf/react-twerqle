/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var PlayerTile = require('./PlayerTile');
require('../../styles/PlayerTiles.css');

var PlayerTiles = React.createClass({
    getInitialState: function() {
        var placeholder = document.createElement("li");
        placeholder.className = "player-tile"
        placeholder.id = "placeholder";
        placeholder.addEventListener("drop", this.tileDrop)
        return {
            placeholder: placeholder,
            orderedTiles: this.props.tiles.slice()
        }
    },
    // tileDragStart: function(e) {
    //     this.dragged = e.currentTarget;
    //     this.dragged.style.opacity = 0.75;
    //     e.dataTransfer.effectAllowed = 'move';
    //     e.dataTransfer.setData("text/html", this.state.orderedTiles[this.dragged.dataset.id]);
    // },
    // tileDrag: function(e) {      
    //     this.dragged.style.display = "none";
    // },
    // tileDragEnd: function(e) {
    //     this.dragged.style.opacity = 1;
    //     this.dragged.style.display = "inline-block"
    //     if (this.dragged.parentNode.children.namedItem("placeholder")) {
    //         this.dragged.parentNode.removeChild(this.state.placeholder);
    //     }
    //     this.over = null;                    

    //     this.props.playerTileDragEnd(e.currentTarget);
    // },
    // tileDragOver: function(e) {
    //     e.preventDefault();
    //     if(e.currentTarget.id == "placeholder") return; 
    //     this.over = e.currentTarget;
    //     this.over.parentNode.insertBefore(this.state.placeholder, this.over);
    // },
    // rackDragEnter:function(e) {
    //     e.preventDefault();
    // },
    // rackDragOver: function(e) {
    //     e.preventDefault();
    // },
    // rackDrop: function(e) {
    //     if (this.over) {
    //         var data = this.state.orderedTiles;
    //         var from = Number(this.dragged.dataset.id);
    //         var to = Number(this.over.dataset.id);
    //         if(from < to) to--;
    //         data.splice(to, 0, data.splice(from, 1)[0]);
    //         this.setState({orderedTiles: data});
    //     }
    // },
    render: function() {
        var tiles = this.state.orderedTiles.map(function (tile, i) {
            return (
                <PlayerTile
                    id={i}
                    key={i + "-" + tile}
                    tile={tile} 
                    selectedTile={this.props.selectedTile}
                    exchangeTiles={this.props.exchangeTiles}
                    playerTileSelect={this.props.playerTileSelect} />
            )
        }, this);
        return (<ul id="rack">
                    {tiles}
                </ul>);
    },
    componentWillReceiveProps: function(nextProps) {

        var orderedTiles = this.state.orderedTiles;
        var propTiles = nextProps.tiles.slice();
        var reconciled = [];

        for (var i = 0; i < orderedTiles.length; i++) {
            var found = propTiles.indexOf(orderedTiles[i]);
            if (found != -1) {
                reconciled.push(orderedTiles[i]);
                propTiles.splice(found, 1);
            }
        };

        var reconciled = reconciled.concat(propTiles);
        this.setState({orderedTiles: reconciled});
    },
    componentDidMount: function() {


    }
});

module.exports = PlayerTiles;
