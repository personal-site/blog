'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend(true, C1V0 || {}, {
  /**
   * Web analytics module. A wrapper around Google Analytics.
   *
   * @namespace
   * @this {navigation}
   * @alias C1V0.navigation
   */
  analytics: {
    /**
     * Fires off a Google Analytics event.
     *
     * @param {string} category
     * @param {string} action
     * @param {string} gh - source code url
     */
    sendEvent: function(category, action, gh) {
      window.ga = window.ga || function() {
          (ga.q = ga.q || []).push(arguments)
      };
      ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: defineAction(action),
        eventLabel: gh
      });

      /**
       * Sanitizes the action names.
       *
       * @param {string} action
       */
      function defineAction(action) {
        let definition = '';

        if (action.toLowerCase() === 'reviewed') {
          definition = C1V0.common.capitalize(action);
        } else {
          definition = 'View ' + C1V0.common.capitalize(action);
        }

        return definition;
      }
    }
  }
});
