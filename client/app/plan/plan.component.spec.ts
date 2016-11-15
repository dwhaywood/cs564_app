'use strict';

describe('Component: PlanComponent', function() {
  // load the controller's module
  beforeEach(module('cs564WebAppApp.plan'));

  var PlanComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PlanComponent = $componentController('plan', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
