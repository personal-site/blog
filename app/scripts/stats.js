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
     * Local container object for hours data.
     * retrieved using {@link stats#get}.
     */
    hours: {},

    /**
     * Local container object for projects data.
     * retrieved using {@link stats#get}.
     */
    projects: {},

    /**
     * Init method.
     */
    init: function() {
      this.get('hours', this._renderHours);
      this.get('projects', this._renderProjects);
    },

    /**
     * AJAX wrapper to get data. Use {@link stats#_path} to build the path.
     *
     * @param {string} type - The data type to get.
     * @param {Object} cb - Callback function to call when done.
     */
    get: function(type, cb) {
      var url;

      $.ajax({
        'url': this._path(type),
        'success': function(data) {
          switch (type) {
            case 'hours':
              this.hours = data;
              break;
            case 'projects':
              this.projects = data;
              break;
          }
        }
      }).done(cb);
    },

    /**
     * Returns an HTTP datafile path.
     *
     * @param {string} type - The data type to get.
     * @returns {string} The datafile path.
     */
    _path: function(type) {
      var url = '';

      switch (type) {
        case 'hours':
          url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fstats.chrisvogt.me%2Freports%2Fdashboard.json%22&diagnostics=true';
          break;
        case 'projects':
          url = 'https://chrisvogt.firebaseio.com/projects.json';
          break;
      }

      return url;
    },

    /**
     * Renders data from {@link stats#hours} onto the page.
     */
    _renderHours: function() {
      var $t = $(this.hours).find('totalTimeInWords').text().split(', ');
      $('#stats-hours .v').text($t[0].replace(/\D/g,''));
    },

    /**
     * Renders data from {@link stats#projects} onto the page.
     */
    _renderProjects: function() {
      $('#stats-projects .v').text(Object.keys(this.projects).length);
    }
  }
});
