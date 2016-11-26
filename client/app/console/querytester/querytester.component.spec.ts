'use strict';

describe('Component: querytester', function() {
  // load the component's module
  beforeEach(angular.mock.module('console.querytester'));

  var querytesterComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    querytesterComponent = $componentController('querytester', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
