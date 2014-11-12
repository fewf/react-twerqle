'use strict';

describe('TilePlacement', function () {
  var TilePlacement, component;

  beforeEach(function () {
    TilePlacement = require('../../../src/scripts/components/TilePlacement.jsx');
    component = TilePlacement();
  });

  it('should create a new instance of TilePlacement', function () {
    expect(component).toBeDefined();
  });
});
