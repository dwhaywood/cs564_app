'use strict';

describe('Component: RecipeDetailView', function() {
  // load the component's module
  beforeEach(angular.mock.module('cs564WebAppApp.RecipeDetailView'));

  var RecipeDetailViewComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    RecipeDetailViewComponent = $componentController('RecipeDetailView', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
