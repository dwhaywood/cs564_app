'use strict';

describe('Component: ShoppingListView', function() {
  // load the component's module
  beforeEach(module('cs564WebAppApp.ShoppingListView'));

  var ShoppingListViewComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    ShoppingListViewComponent = $componentController('ShoppingListView', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
