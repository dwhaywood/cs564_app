'use strict';

describe('Component: MyplanComponent', function() {
  // load the controller's module
  beforeEach(module('cs564WebAppApp.myplan'));

  var MyplanComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MyplanComponent = $componentController('myplan', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
