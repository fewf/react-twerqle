'use strict';

describe('Tile', function () {
  var Tile, component;

  beforeEach(function () {
    Tile = require('../../../src/scripts/components/Tile.jsx');
    component = Tile();
  });

  it('should create a new instance of Tile', function () {
    expect(component).toBeDefined();
  });
});
