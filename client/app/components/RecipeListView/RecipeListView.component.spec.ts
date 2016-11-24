'use strict';

describe('Component: RecipeListView', function() {
  // load the component's module
  beforeEach(agnular.mock.module('cs564WebAppApp.RecipeListView'));

  var RecipeListViewComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    RecipeListViewComponent = $componentController('RecipeListView', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
