/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var GameGenerator = require('./GameGenerator');
require('../../styles/NavBar.css');

var NavBar = React.createClass({
    render: function () {

        return (
            <div id="nav-bar">
                <h1>TWERQLE</h1>
                <GameGenerator 
                	gameActive={Boolean(this.props.game)}
                	handleGameStart={this.props.handleGameStart} />
            </div>
        );
    }
});

module.exports = NavBar;