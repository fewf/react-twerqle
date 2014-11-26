/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Board = require('./Board');
var adaptor = require('../twerqle/adaptor');
var PlayerControls = require('./PlayerControls');
var GameDataView = require('./GameDataView');
require('../../styles/Game.css');

var Game = React.createClass({
    getInitialState: function() {
        return {
                game: this.props.game,
                gameOver: false,
                selectedTile: null,
                exchangeTiles: null,
                gameMessage: "Well, hello"
                }
    },
    render: function() {
        var game = this.state.game;

        var tilePlacements = game.tilePlacements();
        var playableCoords = game.gameOver() ? [] : game.playable();

        var humanPlayer = game.players.filter(function(pl) {return !pl.type})[0];
        
        return (
            <div id="game-root">
                
                <Board 
                    game={this.state.game}
                    playableCoordDragEnter={this.playableCoordDragEnter}
                    playableCoordDragLeave={this.playableCoordDragLeave}
                    playableCoordClick={this.playableCoordClick} />

                <GameDataView game={this.state.game} />                    
                <PlayerControls 
                    player={humanPlayer}
                    turnHistory={this.state.game.turnHistory}
                    selectedTile={this.state.selectedTile}
                    exchangeTiles={this.state.exchangeTiles}
                    message={this.state.gameMessage}

                    playerTileSelect={this.playerTileSelect}
                    playerTileDeselect={this.playerTileDeselect}
                    handleEndTurn={this.handleEndTurn}
                    handleExchange={this.handleExchange}
                    handleTurnReset={this.handleTurnReset}
                    playerTileDragStart={this.playerTileDragStart}
                    playerTileDragEnd={this.playerTileDragEnd} />
            </div>
            )                    
    },
    playerTileDeselect: function() {
        if ( this.state.gameOver ) return;
        this.setState({selectedTile: null, gameMessage: ""});
    },
    playerTileSelect: function(tileComponent) {
        if ( this.state.gameOver ) return;
        if (!this.state.exchangeTiles) {
            // handling for tile placement mode
            if (this.state.selectedTile !== tileComponent) {
                this.setState({selectedTile: tileComponent, gameMessage: "Tile selected"});
            } else {
                this.playerTileDeselect();
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
            this.setState({ exchangeTiles: excTiles, gameMessage: "Tile selected" });
        }

    },
    playableCoordClick: function(playableCoord) {
        if ( this.state.gameOver ) return;
        if (!this.state.selectedTile) return;
        
        var game = this.state.game;
        var success = game.getCurrentPlayer().selectTile(game, this.state.selectedTile.props.tile).placeSelectedTile(game, playableCoord.props.coords);
        if (success) {
            this.setState({game: app.game, selectedTile: null, gameMessage: "Tile placed"});
        }
    },
    handleEndTurn: function() {
        if ( this.state.gameOver ) return;
        var game = this.state.game;
        var success = game.getCurrentPlayer().endTurn(game);
        if (!success) {
            return false;
        } else {
            this.setState({
                game: game, 
                gameMessage: "You scored " + success + " points"
            }, this.routeGame);
        }
        
    },
    handleExchange: function() {
        if ( this.state.gameOver ) return;
        if (this.state.exchangeTiles) {
            if (!this.state.exchangeTiles.length) {
                this.setState({exchangeTiles: null, gameMessage: "Exchange cancelled."});
            } else {
                var player = this.state.game.getCurrentPlayer()
                player.selectedTiles = this.state.exchangeTiles.map(
                                        function(tileComp) { 
                                            return tileComp.props.tile 
                                        });

                var success = player.endTurn(this.state.game);

                if (success) {
                    this.setState({
                        game: this.state.game, 
                        gameMessage: success + " tiles exchanged",
                        exchangeTiles: []
                    }, this.routeGame);
                }
            }
        } else {
            this.handleTurnReset();
            this.setState({exchangeTiles: [], gameMessage: "Choose tiles to exchange"});
        }
    },
    handleTurnReset: function() {
        if ( this.state.gameOver ) return;
        this.state.game.resetTurn();
        this.state.game.getCurrentPlayer().selectedTiles = [];
        this.setState({
                    game: this.state.game, 
                    selectedTile: null, 
                    exchangeTiles: null,
                    gameMessage: "Turn reset"});
    },
    playerTileDragStart: function(tile) {
        if ( this.state.gameOver ) return;
        if (this.state.selectedTile !== tile) this.playerTileSelect(tile);
    },
    playerTileDragEnd: function() {
        if ( this.state.gameOver ) return;
        if (this.over) {
            this.playableCoordClick(this.over);
            this.over = null;
        }
        this.setState({selectedTile: null, gameMessage: ""});
    },        
    playableCoordDragEnter: function(playableCoord, e) {
        if ( this.state.gameOver ) return;
        if (this.state.game.board.placeTileValidate(playableCoord.props.coords, this.state.selectedTile.props.tile)) {
            this.over = playableCoord;
            playableCoord.getDOMNode().classList.add("play-validated");
        }
    },
    playableCoordDragLeave: function(playableCoord, e) {
        if ( this.state.gameOver ) return;
        if (playableCoord === this.over) this.over = null;
        playableCoord.getDOMNode().classList.remove("play-validated");
    },
    routeGame: function() {
        adaptor.saveGameState(this.state.game);
        if (this.state.game.gameOver()) {
            delete localStorage["twerqle.game.in.progress"];
            this.setState({gameOver: true, gameMessage: "Game over"});
        } else if (this.state.game.getCurrentPlayer().type) {
            this.computerPlay();
        }
    },
    computerPlay: function(playSpeed) {
        if (!playSpeed) {
            playSpeed = 1000;
        }
        var playerName = this.state.game.getCurrentPlayer().name;
        var outcome = app.twq.playTurn(this.state.game);
        var lastMove = this.state.game.gameHistory[
                            this.state.game.gameHistory.length - 1
                        ];

        var gameMessage;
        if (lastMove[0] === "exchange") {
            gameMessage = playerName + " exchanged " + outcome + " tiles";
        } else {
            gameMessage = playerName + " scored " + outcome + " points";
        }
        
        this.setState({
            game: this.state.game,
            gameMessage: gameMessage
        });

        window.setTimeout(function() {
            this.setState({
                game: this.state.game,
                gameMessage: gameMessage
            }, this.routeGame);
        }.bind(this), playSpeed);
    },        
    componentDidMount: function() {
        this.routeGame();
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            game: nextProps.game, 
            gameMessage: (<a 
                href="http://en.wikipedia.org/wiki/Qwirkle#Play" 
                target="_blank">
                Know how to play?
                </a>)
        }, this.routeGame);
    }
});

module.exports = Game;
