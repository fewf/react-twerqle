/** @jsx React.DOM */

window.app = {};
app.twq = require('./../twerqle/adaptor');
var UIRoot = require('./UIRoot');
var React = require('react');
var {DefaultRoute, Route, Routes} = require('react-router');

React.renderComponent((
  <Routes location="history">
    <Route path="/" handler={UIRoot}>
    </Route>
  </Routes>
), document.body);
