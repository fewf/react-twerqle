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
        var linkText = this.state.showIcons ? "START" : "NEW GAME";
        var clickFunc = this.state.showIcons ? this.handleGameStart :
                                               function(e) {
                                                    this.setState({showIcons: true});
                                               }.bind(this);

        var mouseEnter = function(e) {
                                this.setState({showIcons: true});
                            }.bind(this);
        var mouseLeave = function(e) {
                                this.setState({showIcons: false});
                            }.bind(this);
        return (
            <div 
                id="game-generator"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave} >
                {computerIcons}
                <a 
                    className="button-link"
                    onClick={this.handleGameStart}>NEW GAME</a>
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
        this.props.handleGameStart(app.game);
        this.setState({showIcons: false});
    }
});

module.exports = GameGenerator;
