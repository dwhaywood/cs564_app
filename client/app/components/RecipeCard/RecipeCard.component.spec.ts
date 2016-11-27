'use strict';

describe('Component: RecipeCard', function() {
  // load the component's module
  beforeEach(module('yes'));

  var RecipeCardComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    RecipeCardComponent = $componentController('RecipeCard', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
