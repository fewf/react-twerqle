'use strict';

describe('PlayerTiles', function () {
  var PlayerTiles, component;

  beforeEach(function () {
    PlayerTiles = require('../../../src/scripts/components/PlayerTiles.jsx');
    component = PlayerTiles();
  });

  it('should create a new instance of PlayerTiles', function () {
    expect(component).toBeDefined();
  });
});
