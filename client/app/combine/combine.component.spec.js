'use strict';

describe('Component: CombineComponent', function() {
  // load the controller's module
  beforeEach(module('hemicApp.combine'));

  var CombineComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CombineComponent = $componentController('combine', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
