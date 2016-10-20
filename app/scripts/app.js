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
    analytics: 'UA-33558417-1',
    projects: 'https://chrisvogt.firebaseio.com/projects.json',
    quotes: 'https://cdn.rawgit.com/chrisvogt/49b51791348a09cbddb0/raw/585d1712885dda5c13d63c17b5e093d543640e42/book-quotes.json',
    social: 'https://chrisvogt.firebaseio.com/profiles.json',
    hours: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fstats.chrisvogt.me%2Freports%2Fdashboard.json%22&diagnostics=true'
  },

  /** Initializer. */
  init: function() {
    $(document).foundation();

    /** Singularizes words ending in 's'. */
    String.prototype.singularize = function() {
      var singular = this;
      if (this.slice(-1) === 's') {
        singular = this.slice(0, this.length -1);
      }
      return singular;
    };

    /** Capitalize the first letter of a string **/
    String.prototype.capitalize = function() {
      return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    /**
     * Twitter API
     *
     * @link https://dev.twitter.com/overview/documentation
     */
    window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
    }(document, 'script', 'twitter-wjs'));

    /**
     * AnswerDash
     *
     * @link http://www.answerdash.com/
     */
    var AnswerDash;
    ! function(e, t, n, s, a) {
        if (!t.getElementById(s)) {
            var i, r = t.createElement(n),
                c = t.getElementsByTagName(n)[0];
            e[a] || (i = e[a] = function() {
                i.__oninit.push(arguments)
            }, i.__oninit = []), r.type = 'text/javascript', r.async = !0, r.src = 'https://p1.answerdash.com/answerdash.min.js?siteid=831', r.setAttribute('id', s), c.parentNode.insertBefore(r, c)
        }
    }(window, document, 'script', 'answerdash-script', 'AnswerDash');
  }
};

C1V0.init();
