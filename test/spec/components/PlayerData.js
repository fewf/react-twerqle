'use strict';

describe('PlayerData', function () {
  var PlayerData, component;

  beforeEach(function () {
    PlayerData = require('../../../src/scripts/components/PlayerData.jsx');
    component = PlayerData();
  });

  it('should create a new instance of PlayerData', function () {
    expect(component).toBeDefined();
  });
});
