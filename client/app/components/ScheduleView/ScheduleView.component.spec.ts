'use strict';

describe('Component: ScheduleView', function() {
  // load the component's module
  beforeEach(module('cs564WebAppApp.ScheduleView'));

  var ScheduleViewComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    ScheduleViewComponent = $componentController('ScheduleView', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
