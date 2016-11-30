'use strict';

describe('Component: recipeselectmodal', function() {
  // load the component's module
  beforeEach(module('cs564WebAppApp.myplan.recipeselectmodal'));

  var recipeselectmodalComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    recipeselectmodalComponent = $componentController('recipeselectmodal', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
