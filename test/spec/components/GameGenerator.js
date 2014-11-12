'use strict';

describe('GameGenerator', function () {
  var GameGenerator, component;

  beforeEach(function () {
    GameGenerator = require('../../../src/scripts/components/GameGenerator.jsx');
    component = GameGenerator();
  });

  it('should create a new instance of GameGenerator', function () {
    expect(component).toBeDefined();
  });
});
