/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/GameDataView.css');
var PlayerData = require('./PlayerData');


var GameDataView = React.createClass({
    render: function () {
        var winners = this.props.game.gameOver() ? 
                        this.props.game.determineWinner() : [];

        var tileBag = (
            <svg width="64px" height="64px">
                <path transform="scale(0.125)" d="M336,111.797c8.844,0,16,7.156,16,16s-7.156,16-16,16H176c-8.844,0-16-7.156-16-16s7.156-16,16-16H336z M345.25,159.797
                    H166.734C87.469,217.609,32,340.141,32,417.953c0,104.656,100.281,93.5,224,93.5s224,11.156,224-93.5
                    C480,340.141,424.531,217.609,345.25,159.797z M166.734,95.797H345.25c0,0,70.75-61.719,38.75-88.719s-103,30-128,28
                    c-25,2-96-55-128-28S166.734,95.797,166.734,95.797z"/>
                <text x="32" y="32" textAnchor="middle" fill="white">
                    {this.props.game.bag.length}
                </text>
            </svg>

        );
        var activePlayer = this.props.game.getCurrentPlayer();
        var playerData = this.props.game.players.map(function(player) {
            return (<PlayerData 
                        player={player} 
                        active={player === activePlayer} 
                        winner={winners.indexOf(player) !== -1} />);
        });

        return (
            <div id="game-data-view">

                {playerData}
                {tileBag}
            </div>
        );
    }
});

module.exports = GameDataView;

// <div>Icon made by <a href="http://www.simpleicon.com" title="SimpleIcon">SimpleIcon</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>