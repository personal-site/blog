'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0 || {}, {
  /**
   * Stats module.
   * @namespace
   * @this {stats}
   * @alias C1V0.stats
   */
  stats: {
    /**
     * Container element.
     * @type {jQuery}
     */
    $container: $('#stats'),

    hideStats: function (type) {
      $stat = C1V0.stats[type].$container;
    }
  }
});
