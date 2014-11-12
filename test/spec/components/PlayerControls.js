'use strict';

describe('PlayerControls', function () {
  var PlayerControls, component;

  beforeEach(function () {
    PlayerControls = require('../../../src/scripts/components/PlayerControls.jsx');
    component = PlayerControls();
  });

  it('should create a new instance of PlayerControls', function () {
    expect(component).toBeDefined();
  });
});
