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
                    tilePlacements={tilePlacements} 
                    playableCoords={playableCoords} 
                    playableCoordDragEnter={this.playableCoordDragEnter}
                    playableCoordDragLeave={this.playableCoordDragLeave}
                    playableCoordClick={this.playableCoordClick} />
                <PlayerControls 
                    player={humanPlayer}
                    turnHistory={this.state.game.turnHistory}
                    selectedTile={this.state.selectedTile}
                    exchangeTiles={this.state.exchangeTiles}
                    message={this.state.gameMessage}

                    playerTileSelect={this.playerTileSelect}
                    handleEndTurn={this.handleEndTurn}
                    handleExchange={this.handleExchange}
                    handleTurnReset={this.handleTurnReset}
                    playerTileDragStart={this.playerTileDragStart}
                    playerTileDragEnd={this.playerTileDragEnd} />
                <GameDataView game={this.state.game} />
            </div>
            )                    
    },
    playerTileSelect: function(tileComponent) {
        if (!this.state.exchangeTiles) {
            // handling for tile placement mode
            if (this.state.selectedTile !== tileComponent) {
                this.setState({selectedTile: tileComponent, gameMessage: "Tile selected"});
            } else {
                this.setState({selectedTile: null, gameMessage: ""});
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
        var game = this.state.game;
        if (!this.state.selectedTile) return;
        var success = game.getCurrentPlayer().selectTile(game, this.state.selectedTile.props.tile).placeSelectedTile(game, playableCoord.props.coords);
        if (success) {
            this.setState({game: app.game, selectedTile: null, gameMessage: "Tile placed"});
        }
    },
    handleEndTurn: function() {
        var game = this.state.game;
        if (!game.getCurrentPlayer().endTurn(game)) {
            return false;
        }
        this.setState({game: game})
    },
    handleExchange: function() {
        if (this.state.exchangeTiles) {
            if (!this.state.exchangeTiles.length) {
                this.setState({exchangeTiles: null, gameMessage: "Exchange cancelled."});
            } else {
                var player = this.state.game.getCurrentPlayer()
                player.selectedTiles = this.state.exchangeTiles.map(
                                        function(tileComp) { 
                                            return tileComp.props.tile 
                                        });

                var numTiles = player.selectedTiles.length;

                if (player.endTurn(this.state.game)) {
                    this.setState({
                        game: this.state.game, 
                        gameMessage: numTiles + " tiles exchanged",
                        exchangeTiles: []
                    });
                }
            }
        } else {
            this.handleTurnReset();
            this.setState({exchangeTiles: [], gameMessage: "Choose tiles to exchange"});
        }
    },
    handleTurnReset: function() {
        this.state.game.resetTurn();
        this.state.game.getCurrentPlayer().selectedTiles = [];
        this.setState({
                    game: this.state.game, 
                    selectedTile: null, 
                    exchangeTiles: null,
                    gameMessage: "Turn reset"});
    },
    playerTileDragStart: function(tile) {
        if (this.state.selectedTile !== tile) this.playerTileSelect(tile);
    },
    playerTileDragEnd: function() {

        if (this.over) {
            this.playableCoordClick(this.over);
            this.over = null;
        }
        this.setState({selectedTile: null, gameMessage: ""});
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


        var that = this;
        window.setTimeout(function() {
            app.twq.playTurn(app.game);

            that.setState({game: app.game, selectedTile: null, exchangeTiles: null});            

        }, playSpeed);
    },        
    componentDidMount: function() {
        if (this.state.game) this.routeGame();
    },
    componentDidUpdate: function() {
        if (this.state.game) this.routeGame();
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            game: nextProps.game, 
            gameMessage: (<a 
                href="http://en.wikipedia.org/wiki/Qwirkle#Play" 
                target="_blank">
                Know how to play?
                </a>)
        });
    }
});

module.exports = Game;
