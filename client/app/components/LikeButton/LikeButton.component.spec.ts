'use strict';

describe('Component: LikeButton', function() {
  // load the component's module
  beforeEach(module('cs564WebAppApp.LikeButton'));

  var LikeButtonComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    LikeButtonComponent = $componentController('LikeButton', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
