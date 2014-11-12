'use strict';

describe('PlayerTile', function () {
  var PlayerTile, component;

  beforeEach(function () {
    PlayerTile = require('../../../src/scripts/components/PlayerTile.jsx');
    component = PlayerTile();
  });

  it('should create a new instance of PlayerTile', function () {
    expect(component).toBeDefined();
  });
});
