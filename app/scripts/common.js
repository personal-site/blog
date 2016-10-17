$(document).foundation();

/**
 * Singularizes words ending in 's'.
 *
 * @param {string}
 * @returns {string}
 */
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
 * Google Analytics
 *
 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/
 */
window.ga = window.ga || function() {
    (ga.q = ga.q || []).push(arguments)
};
ga.l = +new Date;
ga('create', 'UA-33558417-1', 'auto', {
    'allowLinker': true
});
ga('require', 'linker');
ga('linker:autoLink', ['stats.chrisvogt.me']);
ga('send', 'pageview');

/**
 * Fires off a Google Analytics event.
 *
 * @param {string} category
 * @param {string} action
 * @param {string} gh - source code url
 */
function sendEvent(category, action, gh) {
  var ga = window.ga;
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
    if (action.toLowerCase() === 'reviewed') {
      return action.capitalize();
    } else {
      return 'View ' + action.capitalize();
    }
  }
  return true;
}

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
