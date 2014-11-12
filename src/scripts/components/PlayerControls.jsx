/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var PlayerTiles = require('./PlayerTiles');
require('../../styles/PlayerControls.css');

var PlayerControls = React.createClass({
    render: function() {
        var exchangeMsg = "";
        if (this.props.exchangeTiles) {
            exchangeMsg = (<p>Choose the tiles you would like to exchange.</p>);
        }
        return (
            <div className="playerControls">
                <PlayerTiles 
                    tiles={this.props.player.tiles} 
                    selectedTile={this.props.selectedTile}
                    exchangeTiles={this.props.exchangeTiles}
                    playerTileSelect={this.props.playerTileSelect}
                    playerTileDragStart={this.props.playerTileDragStart}
                    playerTileDragEnd={this.props.playerTileDragEnd} />
                <div className="player-buttons">
                    {exchangeMsg}
                    <a 
                        id="end-turn"
                        title="End Turn"
                        onClick={this.props.handleEndTurn} >
                        <svg version="1.1" width="32px" height="32px">
                            <circle cx="16" cy="16" r="14" />
                            <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3px" fill="none" d="M3,20 L13,29 L29,3"/>
                        </svg>
                    </a>
                    <a 
                        id="reset-turn"
                        title="Reset Turn"
                        onClick={this.props.handleTurnReset}>
                        <svg version="1.1" width="32px" height="32px">
                            <circle cx="16" cy="16" r="14" />
                            <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3px" fill="none" d="M3,3 L29,29 M3,29 L29,3"/>
                        </svg>
                    </a>
                    <a 
                        id="exchange-tiles"
                        title="Exchange Tiles"
                        onClick={this.props.handleExchange}>
                        <svg version="1.1" width="32px" height="32px">                        
                            <circle cx="16" cy="16" r="14" />
                            <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3px" fill="none" d="M5,12 A5,3 0 0,1 27,12 m1,-4 l-1,4 l-4,-1"/>
                            <path transform="rotate(180,16,16)" stroke="black"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3px"  fill="none" d="M5,12 A5,3 0 0,1 27,12 m1,-4 l-1,4 l-4,-1"/>
                        </svg>
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = PlayerControls;
// <div>Icons made by Dave Gandy from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>         is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>