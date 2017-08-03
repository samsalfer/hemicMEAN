'use strict';

describe('Component: CompositionComponent', function() {
  // load the controller's module
  beforeEach(module('hemicApp.composition'));

  var CompositionComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CompositionComponent = $componentController('composition', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
