'use strict';

/**
 * @function
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0, {
  /**
   * Class representing stats.
   * @class
   * @extends C1V0
   * @author Chris Vogt <mail@chrisvogt.me>
   */
  stats: {
    /**
     * Init method.
     */
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
      path: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fstats.chrisvogt.me%2Freports%2Fdashboard.json%22&diagnostics=true',

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
        this.http.get(this.renderHours);
      },

      /**
       * Renders data from {@link stats#hours} onto the page.
       */
      renderHours: function() {
        var $t = $(this.data).find('totalTimeInWords').text().split(', ');
        $('#stats-hours .v').text($t[0].replace(/\D/g,''));
      },
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
      init() {
        this.http = new HttpSocket(this.path);
        this.http.get(this.renderProjects);
      },

      /**
       * Renders data from {@link stats#projects} onto the page.
       */
      renderProjects() {
        $('#stats-projects .v').text(Object.keys(this.data).length);
      }
    }
  }
});
