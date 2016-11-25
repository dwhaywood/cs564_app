'use strict';

describe('Component: MyFavoritesComponent', function() {
  // load the controller's module
  beforeEach(angular.mock.module('cs564WebAppApp.myfavorites'));

  var MyFavoritesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MyFavoritesComponent = $componentController('myfavorites', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
