'use strict';

describe('Service: ScheduledMeal', function() {
  // load the service's module
  beforeEach(module('cs564WebAppApp.ScheduledMeal'));

  // instantiate service
  var ScheduledMeal;
  beforeEach(inject(function(_ScheduledMeal_) {
    ScheduledMeal = _ScheduledMeal_;
  }));

  it('should do something', function() {
    expect(!!ScheduledMeal).toBe(true);
  });
});
