/** @jsx React.DOM */

window.app = {};
app.twq = require('./../twerqle/adaptor');
var UIRoot = require('./UIRoot');
var React = require('react');

// Not using Routes at the moment. 
// Keeping this in place for later possible usage.

// var {DefaultRoute, Route, Routes} = require('react-router');

// React.renderComponent((
//   <Routes location="history">
//     <Route path="/" handler={UIRoot}>
//     </Route>
//   </Routes>
// ), document.body);

app.UI = React.renderComponent(<UIRoot />, document.body);