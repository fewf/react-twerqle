/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ComputerIcons = require('./ComputerIcons');
require('../../styles/GameGenerator.css');

var GameGenerator = React.createClass({
    getInitialState: function() {
        return {
                    humanPlayer: true,
                    numOpponents: 1,
                    numTypes: 6,
                    numCopies: 3
                }
    },
    render: function() {

        return (
            <div id="game-generator">

                <ComputerIcons numOpponents={this.state.numOpponents} 
                               addBot={this.addBot} 
                               removeBot={this.removeBot} />
                <a className="button-link" onClick={this.handleGameStart}>NEW GAME</a>
            </div>
            )
    },
    addBot: function(e) {
        e.stopPropagation();
        this.setState({ numOpponents: this.state.numOpponents + 1 });
    },
    removeBot: function(e) {
        e.stopPropagation();
        this.setState({ numOpponents: this.state.numOpponents - 1 });
    },
    handleGameStart: function() {
        app.game = app.twq.startGame(this.state.numOpponents);
        this.props.handleGameStart(app.game);
    }
});

module.exports = GameGenerator;
