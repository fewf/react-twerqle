'use strict';

describe('GameDataView', function () {
  var GameDataView, component;

  beforeEach(function () {
    GameDataView = require('../../../src/scripts/components/GameDataView.jsx');
    component = GameDataView();
  });

  it('should create a new instance of GameDataView', function () {
    expect(component).toBeDefined();
  });
});
