'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0.stats || {}, {
  /**
   * @extends C1V0.stats
   */
  projects: {
    /**
     * Projects data endpoint.
     */
    path: 'https://chrisvogt.firebaseio.com/projects.json',

    /**
     * Used to make HTTP requests.
     * @type {object}
     */
    http: {},

    /**
     * Component container.
     * @type {jQuery}
     */
    $container: $('#stats-projects'),

    /**
     * Init method.
     */
    init: function() {
      this.http = new HttpSocket(this.path);
      this.http.get(this.render, this.failure);
    },

    /**
     * Renders data from {@link stats#projects} onto the page.
     */
    render: function() {
      const count = Object.keys(this.data).length;
      C1V0.stats.projects.$container
          .find('.v')
          .text(count);
    },

    /** Handles HTTP request failure. */
    failure: function() {
      C1V0.stats.projects.$container.addClass('hidden');
      C1V0.stats.hours.$container
          .removeClass('small-6')
          .addClass('small-12');

      /* Hide the entire pane if the other request failed. */
      if (C1V0.stats.hours.$container.hasClass('hidden')) {
        C1V0.stats.$container.addClass('hidden');
      }
    }
  }
});

C1V0.stats.projects.init();
