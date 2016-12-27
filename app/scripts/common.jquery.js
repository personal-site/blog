'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method that adds the Common object to the C1V0 namespace.
 */
$.extend(true, C1V0 || {}, {
  /**
   * Common module.
   *
   * @namespace
   * @this {common}
   * @alias C1V0.common
   */
  common: {
    /** Initializer. */
    init: function() {

    },

    /** Capitalize the first letter of a string **/
    capitalize: function(str) {
      return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }
  }
});

C1V0.common.init();
