'use strict';

describe('Service: djangoAuth', function () {

  // load the service's module
  beforeEach(module('upstreamApp'));

  // instantiate service
  var djangoAuth;
  beforeEach(inject(function (_djangoAuth_) {
    djangoAuth = _djangoAuth_;
  }));

  it('should do something', function () {
    expect(!!djangoAuth).toBe(true);
  });

});
