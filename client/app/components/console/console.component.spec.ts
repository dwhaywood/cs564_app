'use strict';

describe('Component: console', function() {
  // load the component's module
  beforeEach(module('cs564WebAppApp.console'));

  var consoleComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    consoleComponent = $componentController('console', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
