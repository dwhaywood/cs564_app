'use strict';

describe('Component: MylistComponent', function() {
  // load the controller's module
  beforeEach(module('cs564WebAppApp.mylist'));

  var MylistComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MylistComponent = $componentController('mylist', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
