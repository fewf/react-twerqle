/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var PlayerTiles = require('./PlayerTiles');
require('../../styles/PlayerControls.css');

var PlayerControls = React.createClass({
    getInitialState: function() {
        return {tileSort: 'color'};
    },
    render: function() {
        var sort = this.state.sort;
        var tiles = this.props.player.sortTilesBy(sort);
        var sortTitle = "Sort Tiles by " + ((this.state.sort === "color") ? "Shape" : "Color");
        return (
            <div className="playerControls">
                <PlayerTiles 
                    tiles={tiles} 
                    selectedTile={this.props.selectedTile}
                    exchangeTiles={this.props.exchangeTiles}
                    playerTileSelect={this.props.playerTileSelect}
                    playerTileDragStart={this.props.playerTileDragStart}
                    playerTileDragEnd={this.props.playerTileDragEnd} />
                <div id="game-message-and-player-buttons">
                    <p className="game-message">{this.props.message}</p>
                    <div className="player-buttons turn-buttons">
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
                        </div>
                        <div className="player-buttons tile-buttons">
                        <a 
                            id="sort-tiles"
                            title={sortTitle}
                            onClick={this.changeSort} >
                            <svg version="1.1" width="32px" height="32px">                        
                                <circle cx="16" cy="16" r="14" />
                                <path 
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    fill="black"
                                    d="M 16 4 L 28 14 L 4 14 Z M 16 28 L 28 18 L 4 18 Z" />
                            </svg>
                        </a>
                        <a 
                            id="exchange-tiles"
                            title="Exchange Tiles"
                            onClick={this.props.handleExchange}>
                            <svg version="1.1" width="32px" height="32px">                        
                                <circle cx="16" cy="16" r="14" />
                                <path transform=" translate(8,6) scale(0.0325)" d="M336,111.797c8.844,0,16,7.156,16,16s-7.156,16-16,16H176c-8.844,0-16-7.156-16-16s7.156-16,16-16H336z M345.25,159.797
                                H166.734C87.469,217.609,32,340.141,32,417.953c0,104.656,100.281,93.5,224,93.5s224,11.156,224-93.5
                                C480,340.141,424.531,217.609,345.25,159.797z M166.734,95.797H345.25c0,0,70.75-61.719,38.75-88.719s-103,30-128,28
                                c-25,2-96-55-128-28S166.734,95.797,166.734,95.797z"/>
                                <path transform="translate(0,-4)" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3px" fill="none" d="M5,12 A5,3 0 0,1 27,12 m1,-4 l-1,4 l-4,-1"/>
                                <path transform="translate(0,4) rotate(180,16,16)" stroke="black"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3px"  fill="none" d="M5,12 A5,3 0 0,1 27,12 m1,-4 l-1,4 l-4,-1"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        );
    },
    changeSort: function() {
        this.setState({
            sort: this.state.sort === "color" ? "shape" : "color"
        });
    },
});

module.exports = PlayerControls;
// <div>Icons made by Dave Gandy from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>         is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>