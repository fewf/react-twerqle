'use strict';

describe('Game', function () {
  var Game, component;

  beforeEach(function () {
    Game = require('../../../src/scripts/components/Game.jsx');
    component = Game();
  });

  it('should create a new instance of Game', function () {
    expect(component).toBeDefined();
  });
});
