'use strict';

describe('BoardSVG', function () {
  var BoardSVG, component;

  beforeEach(function () {
    BoardSVG = require('../../../src/scripts/components/BoardSVG.jsx');
    component = BoardSVG();
  });

  it('should create a new instance of BoardSVG', function () {
    expect(component).toBeDefined();
  });
});
