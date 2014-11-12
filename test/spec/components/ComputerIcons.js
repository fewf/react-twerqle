'use strict';

describe('ComputerIcons', function () {
  var ComputerIcons, component;

  beforeEach(function () {
    ComputerIcons = require('../../../src/scripts/components/ComputerIcons.jsx');
    component = ComputerIcons();
  });

  it('should create a new instance of ComputerIcons', function () {
    expect(component).toBeDefined();
  });
});
