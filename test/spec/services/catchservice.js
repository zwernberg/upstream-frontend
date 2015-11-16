'use strict';

describe('Service: catchService', function () {

  // load the service's module
  beforeEach(module('upstreamApp'));

  // instantiate service
  var catchservice;
  beforeEach(inject(function (_catchService_) {
    catchService = _catchService_;
  }));

  it('should do something', function () {
    expect(!!catchService).toBe(true);
  });

});
