beforeEach(function() {
  this.addMatchers({
    toBeCloseTo: function(expected) {
      var tolerance = arguments[1] || 1;
      return (this.actual <= expected + tolerance) && (this.actual >= expected - tolerance);
    }
  })
});
