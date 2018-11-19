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
    /**
     * Capitalize the first letter of a string
     * @param {string} str The string to capitalize.
     * @returns {string} The capitalized string.
     */
    capitalize(str) {
      return str.replace(/(?:^|\s)\S/g, a => {
        return a.toUpperCase();
      });
    }
  }
});
