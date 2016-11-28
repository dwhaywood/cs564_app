'use strict';

describe('Component: recipecardmini', function() {
  // load the component's module
  beforeEach(module('cs564WebAppApp.recipecardmini'));

  var recipecardminiComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    recipecardminiComponent = $componentController('recipecardmini', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
