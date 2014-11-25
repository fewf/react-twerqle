/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var PlayerTile = require('./PlayerTile');
require('../../styles/PlayerTiles.css');

var PlayerTiles = React.createClass({
    render: function() {
        var tiles = this.props.tiles.map(function (tile, i) {
            return (
                <PlayerTile
                    id={i}
                    key={i + "-" + tile}
                    tile={tile} 
                    selectedTile={this.props.selectedTile}
                    exchangeTiles={this.props.exchangeTiles}
                    playerTileSelect={this.props.playerTileSelect}
                    playerTileDeselect={this.props.playerTileDeselect} />
            )
        }, this);
        return (<ul id="rack">
                    {tiles}
                </ul>);
    }
});

module.exports = PlayerTiles;
