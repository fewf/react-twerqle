var State = require('./state');
var Board = require('./board');
var _ = require('underscore');

exports.playTurn = function(state) {

    var player = state.getCurrentPlayer();
    var score = player.score;
    var move = state.computerPlay();
    if (move[0] === 'play') {

        for (var i = 0; i < move[1].length; i++) {
            if(!player.selectTile(state, move[1][i].tile).placeSelectedTile(state, move[1][i].coords)) {
                throw 'Bot failed.';
            }
        };

        player.endTurn(state);

        return 
    } else {
        player.selectedTiles = move[1];
        player.endTurn(state);
    }
}

exports.startGame = function(numBots, numTypes, numCopies) {
    // game defaults:
    if (typeof numBots === 'undefined') numBots = 1;
    if (typeof numTypes === 'undefined') numTypes = 4;
    if (typeof numCopies === 'undefined') numCopies = 1;

    var playerNames = _.range(numBots + 1).map(function(x) { return 'player ' + (x + 1); });
    // var playerNames = _.range(numBots).map(function(x) { return 'player ' + (x + 1); });
    // var playerTypes = _.range(numBots).map(function() { return 10; });
    var playerTypes = [0].concat(_.range(numBots).map(function() { return 10; }));


    return State.initState(playerNames, playerTypes, 6, 3);
}


exports.stateToJSON = function(state) {
    var ret = {
                gameHistory: state.gameHistory,
                turnHistory: state.turnHistory,
                players: state.players
            };
    return ret;
}

exports.JSONToGame = function(JSONstring) {
    var parsed = JSON.parse(JSONstring);

    var game = State.initState(_.range(parsed.players.length), 
                                 _.range(parsed.players.length).map(function() { return 10; }),
                                 parsed.numTypes,
                                 parsed.copies);

    game.tilesPerPlayer = parsed.tilesPerPlayer
    game.bag = parsed.bag;

    for (var i = 0; i < parsed.players.length; i++) {
        for (prop in parsed.players[i]) {
            game.players[i][prop] = parsed.players[i][prop]
        }
    };

    game.gameHistory = parsed.gameHistory.map(function(gh) {
        if (gh[0] !== "exchange") {
            return gh.map(function(tps) {
                return new Board.TilePlacement(new Board.Coordinates(tps.coords.x, tps.coords.y), tps.tile);
            });
        } else {
            return gh;
        }
    });

    game.turnHistory = parsed.turnHistory.map(function(tps) {
        return new Board.TilePlacement(new Board.Coordinates(tps.coords.x, tps.coords.y), tps.tile);
    });

    game.playableCache = parsed.playableCache.map(function(coords) {
        return new Board.Coordinates(coords.x, coords.y);
    });

    return game;
}

exports.getScreenDims = function() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return {x: x, y: y};
}

exports.saveGameState =function(game) {
    if (!game) return true;
    localStorage["twerqle.game.in.progress"] = game.toJSON();
    return true;
}

exports.resumeGame =function() {
    if (localStorage["twerqle.game.in.progress"]) {
        window.app = window.app || {};
        app.game = app.twq.JSONToGame(localStorage["twerqle.game.in.progress"]);
        return app.game;
    } else {
        return null;
    }
}
exports.getColor = function(tileNum) { return colors[State.getColor(tileNum)]; }
exports.getShape = function(tileNum) { return shapes[State.getShape(tileNum)]; }