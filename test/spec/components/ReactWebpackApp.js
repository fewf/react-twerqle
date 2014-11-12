'use strict';

describe('Main', function () {
  var ReactWebpackApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactWebpackApp = require('../../../src/scripts/components/ReactWebpackApp.jsx');
    component = ReactWebpackApp();
  });

  it('should create a new instance of ReactWebpackApp', function () {
    expect(component).toBeDefined();
  });
});
