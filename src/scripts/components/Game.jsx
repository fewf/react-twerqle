/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Board = require('./Board');
var adaptor = require('../twerqle/adaptor');
var PlayerControls = require('./PlayerControls');
require('../../styles/Game.css');

var Game = React.createClass({
    getInitialState: function() {
        return { 
                game: this.props.game,
                selectedTile: null,
                exchangeTiles: null
                }
    },
    render: function() {
        var game = this.props.game;

        if (!game) {
            return (
                <div id="game-root">
                    <Board 
                        tilePlacements={[]} 
                        playableCoords={[]} 
                        playableCoordDragEnter={this.playableCoordDragEnter}
                        playableCoordDragLeave={this.playableCoordDragLeave}
                        playableCoordClick={this.playableCoordClick} />
                </div>
            )
        }

        var tilePlacements = game.tilePlacements();
        var playableCoords = game.playable();

        return (
            <div id="game-root">
                <Board 
                    tilePlacements={tilePlacements} 
                    playableCoords={playableCoords} 
                    playableCoordDragEnter={this.playableCoordDragEnter}
                    playableCoordDragLeave={this.playableCoordDragLeave}
                    playableCoordClick={this.playableCoordClick} />
                <PlayerControls 
                    player={game.getCurrentPlayer()}
                    activePlayer={true}
                    turnHistory={this.state.game.turnHistory}
                    selectedTile={this.state.selectedTile}
                    exchangeTiles={this.state.exchangeTiles}
                    playerTileSelect={this.playerTileSelect}
                    handleEndTurn={this.handleEndTurn}
                    handleExchange={this.handleExchange}
                    handleTurnReset={this.handleTurnReset}
                    playerTileDragStart={this.playerTileDragStart}
                    playerTileDragEnd={this.playerTileDragEnd} />
            </div>
            )                    
    },
    playerTileSelect: function(tileComponent) {
        if (!this.state.exchangeTiles) {
            // handling for tile placement mode
            if (this.state.selectedTile !== tileComponent) {
                this.setState({selectedTile: tileComponent});
            } else {
                this.setState({selectedTile: null});
            }                
        } else {
            // handling for exchange mode
            var excTiles = this.state.exchangeTiles;
            var index = excTiles.indexOf(tileComponent);
            if (index === -1) {
                excTiles.push(tileComponent);
            } else {
                excTiles.splice(index, 1);
            }
            this.setState({ exchangeTiles: excTiles });
        }

    },
    playableCoordClick: function(playableCoord) {
        var game = this.state.game;
        if (!this.state.selectedTile) return;
        var success = game.getCurrentPlayer().selectTile(game, this.state.selectedTile.props.tile).placeSelectedTile(game, playableCoord.props.coords);
        if (success) {
            this.setState({game: app.game, selectedTile: null});
        }
    },
    handleEndTurn: function() {
        var game = this.state.game;
        if (!game.getCurrentPlayer().endTurn(game)) {
            return false;
        }

        this.routeGame();
    },
    handleExchange: function() {
        if (this.state.exchangeTiles) {
            var player = this.state.game.getCurrentPlayer()
            player.selectedTiles = this.state.exchangeTiles.map(function(tileComp) { return tileComp.props.tile });
            if (player.endTurn(this.state.game)) {
                player.selectedTiles = [];
            }
            this.computerPlay();
        } else {
            this.setState({exchangeTiles: []});
        }
    },
    handleTurnReset: function() {
        this.state.game.resetTurn();
        this.state.game.getCurrentPlayer().selectedTiles = [];
        this.setState({game: this.state.game, selectedTile: null, exchangeTiles: null});
    },
    playerTileDragStart: function(tile) {
        if (this.state.selectedTile !== tile) this.playerTileSelect(tile);
    },
    playerTileDragEnd: function() {

        if (this.over) {
            this.playableCoordClick(this.over);
            this.over = null;
        }
        this.setState({selectedTile: null});
    },        
    playableCoordDragEnter: function(playableCoord, e) {
        this.over = playableCoord;
        if (this.state.game.board.placeTileValidate(playableCoord.props.coords, this.state.selectedTile.props.tile)) {
            playableCoord.getDOMNode().classList.add("play-validated");
        }
    },
    playableCoordDragLeave: function(playableCoord, e) {
        if (e.currentTarget === this.over) this.over = null;
        playableCoord.getDOMNode().classList.remove("play-validated");
    },
    routeGame: function() {
        adaptor.saveGameState(this.state.game);
        if (this.state.game.gameOver()) {
            console.log('game over!');
            this.props.handleGameEnd();
        } else if (this.state.game.getCurrentPlayer().type) {
            this.computerPlay();
        }
    },
    computerPlay: function(playSpeed) {
        if (typeof playSpeed == "undefined") {
            playSpeed = 500;
        }

        if (this.state.game.getCurrentPlayer().type) {
            app.twq.playTurn(app.game);

            this.setState({game: app.game, selectedTile: null, exchangeTiles: null});
        }
        var that = this;
        window.setTimeout(function() {
            that.routeGame(playSpeed);
        }, playSpeed);
    },        
    componentDidMount: function() {
        if (this.state.game) this.routeGame();
    }
});

module.exports = Game;
