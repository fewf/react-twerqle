'use strict';

describe('UIRoot', function () {
  var UIRoot, component;

  beforeEach(function () {
    UIRoot = require('../../../src/scripts/components/UIRoot.jsx');
    component = UIRoot();
  });

  it('should create a new instance of UIRoot', function () {
    expect(component).toBeDefined();
  });
});
