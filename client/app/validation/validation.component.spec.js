'use strict';

describe('Component: ValidationComponent', function() {
  // load the controller's module
  beforeEach(module('hemicApp.validation'));

  var ValidationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ValidationComponent = $componentController('validation', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
