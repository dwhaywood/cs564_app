'use strict';

describe('Component: ConsoleComponent', function() {
  // load the controller's module
  beforeEach(angular.mock.module('cs564WebAppApp.console'));

  var ConsoleComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ConsoleComponent = $componentController('console', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
