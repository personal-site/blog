'use strict';

/**
 * STATS module
 *
 * GET and RENDER developer stats for stats.chrisvogt.me.
 *
 * @author Chris Vogt <mail@chrisvogt.me>
 *
 */
$.extend( true, C1V0, {
  stats: {
    hours: {},
    projects: {},

    /**
     * INIT method
     */
    init: function() {
      this.get('hours', this._renderHours);
      this.get('projects', this._renderProjects);
    },

    /**
     * AJAX wrapper
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
     * Returns an HTTP datafile path
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
     * Renders TIME data
     */
    _renderHours: function() {
      var $t = $(this.hours).find('totalTimeInWords').text().split(', ');
      $('#stats-hours .v').text($t[0].replace(/\D/g,''));
    },

    /**
     * Renders PROJECT data
     */
    _renderProjects: function() {
      $('#stats-projects .v').text(Object.keys(this.projects).length);
    }
  }
});

C1V0.stats.init();
