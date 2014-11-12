'use strict';

describe('PlayableCoord', function () {
  var PlayableCoord, component;

  beforeEach(function () {
    PlayableCoord = require('../../../src/scripts/components/PlayableCoord.jsx');
    component = PlayableCoord();
  });

  it('should create a new instance of PlayableCoord', function () {
    expect(component).toBeDefined();
  });
});
