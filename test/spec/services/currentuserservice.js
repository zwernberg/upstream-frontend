'use strict';

describe('Service: currentUserService', function () {

  // load the service's module
  beforeEach(module('upstreamApp'));

  // instantiate service
  var currentUserService;
  beforeEach(inject(function (_currentUserService_) {
    currentUserService = _currentUserService_;
  }));

  it('should do something', function () {
    expect(!!currentUserService).toBe(true);
  });

});
