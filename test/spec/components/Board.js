'use strict';

describe('Board', function () {
  var Board, component;

  beforeEach(function () {
    Board = require('../../../src/scripts/components/Board.jsx');
    component = Board();
  });

  it('should create a new instance of Board', function () {
    expect(component).toBeDefined();
  });
});
