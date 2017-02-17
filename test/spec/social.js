(function() {
  'use strict';

  describe('Social', function() {
    var social = C1V0.social;

    it('should be loaded and available', function() {
      assert.typeOf(social, 'object'); // without optional message
    });

    describe('path', function() {
      var path = social.path;

      it('should return a string', function() {
        assert.typeOf(path, 'string'); // without optional message
      });

      it('should should match the path set in the config', function() {
        assert.strictEqual(path, C1V0.config.social); // without optional message
      });

      it('should contain at least 3 characters', function() {
        assert.isAtLeast(path.length, 3)
      });
    });
  });
})();
