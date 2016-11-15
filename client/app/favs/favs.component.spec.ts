'use strict';

describe('Component: FavsComponent', function() {
  // load the controller's module
  beforeEach(module('cs564WebAppApp.favs'));

  var FavsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FavsComponent = $componentController('favs', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
