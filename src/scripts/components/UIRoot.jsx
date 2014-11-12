/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/UIRoot.css');
// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var adaptor = require('../twerqle/adaptor');
var Game = require('./Game');
var GameGenerator = require('./GameGenerator');
var NavBar = require('./NavBar');

var UIRoot = React.createClass({
    getInitialState: function() {
        var game = adaptor.resumeGame();
        return { 
                game: game,
                }
    },
    render: function() {
        var game;
        if (this.state.game) {
            game = (<Game game={this.state.game} handleGameEnd={this.handleGameEnd} />);
        }

        return (
            <div id="UIRoot">
                <NavBar game={this.state.game} handleGameStart={this.handleGameStart} />
                {game}
            </div>
        )
    },
    handleGameStart: function(game) {
        this.setState({game: game});
    },
    handleGameEnd: function(game) {
        this.setState({game: "over"});
    }
});

module.exports = UIRoot;