/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ComputerIcons = require('./ComputerIcons');
require('../../styles/GameGenerator.css');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var GameGenerator = React.createClass({
    getInitialState: function() {
        return {
                    numOpponents: 1,
                    showIcons: !this.props.gameActive
                }
    },
    render: function() {
        var computerIcons = this.state.showIcons ? (

                                    <ComputerIcons 
                                        numOpponents={this.state.numOpponents} 
                                        addBot={this.addBot} 
                                        removeBot={this.removeBot} />

                                ) : null;


        var mouseEnter = function(e) {
                                this.setState({showIcons: true});
                            }.bind(this);
        var mouseLeave = function(e) {
                                this.setState({showIcons: false});
                            }.bind(this);
        return (
            <div 
                id="game-generator"
                onTap={mouseEnter}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave} >
                <a 
                    className="button-link"
                    onClick={this.handleGameStart}>NEW GAME</a>
                <ReactCSSTransitionGroup transitionName="fade">
                    {computerIcons}
                </ReactCSSTransitionGroup>
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
    handleGameStart: function(e) {
        app.game = app.twq.startGame(this.state.numOpponents);
        var botNum = 1;
        for (var i = 0; i < app.game.players.length; i++) {
            if (app.game.players[i].type) {
                app.game.players[i].name = "Bot " + botNum;
                botNum++;
            } else {
                app.game.players[i].name = "You";
            }
        };
        this.props.handleGameStart(app.game);
        this.setState({showIcons: false});
    }
});

module.exports = GameGenerator;
