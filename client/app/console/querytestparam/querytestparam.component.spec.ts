'use strict';

describe('Component: querytestparam', function() {
  // load the component's module
  beforeEach(angular.mock.module('console.querytestparam'));

  var querytestparamComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    querytestparamComponent = $componentController('querytestparam', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
