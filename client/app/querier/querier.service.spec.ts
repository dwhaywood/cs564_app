'use strict';

describe('Service: querier', function() {
  // load the service's module
  beforeEach(module('cs564WebAppApp.querier'));

  // instantiate service
  var querier;
  beforeEach(inject(function(_querier_) {
    querier = _querier_;
  }));

  it('should do something', function() {
    expect(!!querier).toBe(true);
  });
});
