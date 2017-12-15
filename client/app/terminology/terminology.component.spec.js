'use strict';

describe('Component: TerminologyComponent', function() {
  // load the controller's module
  beforeEach(module('hemicApp.terminology'));

  var TerminologyComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    TerminologyComponent = $componentController('terminology', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
