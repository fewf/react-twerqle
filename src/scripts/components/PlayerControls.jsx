/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var PlayerTiles = require('./PlayerTiles');
require('../../styles/PlayerControls.css');

var PlayerControls = React.createClass({
    render: function() {
        var cls = "playerControls" + (this.props.activePlayer ? " active" : "");
        var turnBegun = Boolean(this.props.turnHistory.length);
        var exchangeMsg = "";
        var resetButtonText = "reset turn";
        if (this.props.exchangeTiles) {
            exchangeMsg = (<p>Choose the tiles you would like to exchange.</p>);
        }
        return (
                <div className={cls}>
                    <p>{this.props.player.name} - {this.props.player.score}</p>
                    {exchangeMsg}
                    <PlayerTiles tiles={this.props.player.tiles} 
                                 selectedTile={this.props.selectedTile}
                                 exchangeTiles={this.props.exchangeTiles}
                                 playerTileSelect={this.props.playerTileSelect}
                                 playerTileDragStart={this.props.playerTileDragStart}
                                 playerTileDragEnd={this.props.playerTileDragEnd} />
                    <div className="player-buttons">
                        <button disabled={turnBegun ? "" : "disabled"} onClick={this.props.handleEndTurn}>end turn</button>
                        <button onClick={this.props.handleTurnReset}>reset turn</button>
                        <button disabled={turnBegun ? "disabled" : ""} onClick={this.props.handleExchange}>exchange tiles</button>
                    </div>
                </div>
            );
    },
    componentDidMount: function() {
        $(this.getDOMNode()).draggable({ handle: "p"});
    }
});

module.exports = PlayerControls;
