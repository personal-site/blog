(function() {
  'use strict';

  describe('C1V0', function() {
    describe('Common submodule', function() {
      var common = C1V0.common;

      it('should be loaded and available', function() {
        assert.typeOf(common, 'object'); // without optional message
      });

      describe('capitalize()', function() {
        var phrase = 'test',
          result = common.capitalize(phrase);

        it('should return a string', function() {
          assert.typeOf(result, 'string'); // without optional message
        });

        it('should return a string whose length matches the input', function() {
          assert.lengthOf(result, phrase.length, 'output length matches input length')
        });

        it('should capitalize the input\'s first character', function() {
          assert.equal(phrase[0].toUpperCase(), result[0]);
        });
      });
    });
  });
})();
