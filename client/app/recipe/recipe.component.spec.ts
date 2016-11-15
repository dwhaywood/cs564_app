'use strict';

describe('Component: RecipeComponent', function() {
  // load the controller's module
  beforeEach(module('cs564WebAppApp.recipe'));

  var RecipeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RecipeComponent = $componentController('recipe', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
