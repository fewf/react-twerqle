/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var PlayerTile = require('./PlayerTile');
require('../../styles/PlayerTiles.css');

var PlayerTiles = React.createClass({
    // getInitialState: function() {
        // var placeholder = document.createElement("li");
        // placeholder.className = "player-tile"
        // placeholder.id = "placeholder";
        // placeholder.addEventListener("drop", this.tileDrop)
        // return {
        //     placeholder: placeholder,
        // }
    // },
    render: function() {
        var tiles = this.props.tiles.map(function (tile, i) {
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

        // var orderedTiles = this.state.orderedTiles;
        // var propTiles = nextProps.tiles.slice();
        // var reconciled = [];

        // for (var i = 0; i < orderedTiles.length; i++) {
        //     var found = propTiles.indexOf(orderedTiles[i]);
        //     if (found != -1) {
        //         reconciled.push(orderedTiles[i]);
        //         propTiles.splice(found, 1);
        //     }
        // };

        // var reconciled = reconciled.concat(propTiles);
        // this.setState({orderedTiles: reconciled});
    }
});

module.exports = PlayerTiles;
