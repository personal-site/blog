'use strict';

/** @namespace */
var C1V0 = C1V0 || {
  /**
   * Configuration object.
   *
   * Contains endpoints for site components.
   * @type {Object}
   */
  config: {
    navigation: '',
    projects: 'https://chrisvogt.firebaseio.com/projects.json',
    quotes: 'https://cdn.rawgit.com/chrisvogt/49b51791348a09cbddb0/raw/585d1712885dda5c13d63c17b5e093d543640e42/book-quotes.json',
    social: 'https://chrisvogt.firebaseio.com/profiles.json',
    hours: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fstats.chrisvogt.me%2Freports%2Fdashboard.json%22&diagnostics=true'
  }
};
