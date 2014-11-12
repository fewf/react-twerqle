'use strict';

describe('NavBar', function () {
  var NavBar, component;

  beforeEach(function () {
    NavBar = require('../../../src/scripts/components/NavBar.jsx');
    component = NavBar();
  });

  it('should create a new instance of NavBar', function () {
    expect(component).toBeDefined();
  });
});
