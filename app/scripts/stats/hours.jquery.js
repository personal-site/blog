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
  hours: {
    /**
     * Hours data endpoint.
     */
    path: C1V0.config.hours,

    /**
     * Used to make HTTP requests.
     * @type {object}
     */
    http: {},

    /**
     * Component container.
     * @type {jQuery}
     */
    $container: $('#stats-hours'),

    /**
     * Init method.
     */
    init: function() {
      this.http = new HttpSocket(this.path);
      this.http.get(this.render, this.failure);
    },

    /**
     * Renders data from {@link stats#hours} onto the page.
     */
    render: function() {
      const time = $(this.data)
          .find('totalTimeInWords')
          .text()
          .split(', ');
      const hours = time[0].replace(/\D/g,'');
      const $term = C1V0.stats.hours.$container.find('span.term');

      if (hours === '1') {
        $term.text('hour');
      }

      C1V0.stats.hours.$container.find('.v').text(hours);
    },

    failure: function() {
      C1V0.stats.hours.$container.addClass('hidden');
      C1V0.stats.projects.$container
          .removeClass('small-6')
          .addClass('small-12');

      /* Hide the entire pane if the other request failed. */
      if (C1V0.stats.projects.$container.hasClass('hidden')) {
        C1V0.stats.$container.addClass('hidden');
      }
    }
  }
});

C1V0.stats.hours.init();
