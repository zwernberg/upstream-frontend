'use strict';

describe('Service: validate', function () {

  // load the service's module
  beforeEach(module('upstreamApp'));

  // instantiate service
  var validate;
  beforeEach(inject(function (_validate_) {
    validate = _validate_;
  }));

  it('should do something', function () {
    expect(!!validate).toBe(true);
  });

});
