'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0 || {}, {
  /**
   * Stats module.
   *
   * @namespace
   * @this {stats}
   * @alias C1V0.stats
   */
  stats: {
    /** Initializer. */
    init: function() {
      this.hours.init();
      this.projects.init();
    },

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
       * Init method.
       */
      init: function() {
        this.http = new HttpSocket(this.path);
        this.http.get(this.renderHours, this.failure);
      },

      /**
       * Renders data from {@link stats#hours} onto the page.
       */
      renderHours: function() {
        const $t = $(this.data).find('totalTimeInWords').text().split(', ');
        $('#stats-hours .v').text($t[0].replace(/\D/g,''));
      },

      failure: function() {
        $('#stats-hours').addClass('hidden');
        $('#stats-projects').removeClass('small-6').addClass('small-12');

        /* Hide the entire pane if the other request failed. */
        if ($('#stats-projects').hasClass('hidden')) {
          $('#stats').addClass('hidden');
        }
      }
    },

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
       * Init method.
       */
      init: function() {
        this.http = new HttpSocket(this.path);
        this.http.get(this.renderProjects, this.failure);
      },

      /**
       * Renders data from {@link stats#projects} onto the page.
       */
      renderProjects: function() {
        $('#stats-projects .v').text(Object.keys(this.data).length);
      },

      /** Handles HTTP request failure. */
      failure: function() {
        $('#stats-projects').addClass('hidden');
        $('#stats-hours').removeClass('small-6').addClass('small-12');

        /* Hide the entire pane if the other request failed. */
        if ($('#stats-hours').hasClass('hidden')) {
          $('#stats').addClass('hidden');
        }
      }
    }
  }
});

C1V0.stats.init();
