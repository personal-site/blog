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

$.createCache = function( requestFunction ) {
  var cache = {};

  return function( key, callback ) {
    if ( !cache[key] ) {
      cache[ key ] = $.Deferred(function( defer ) {
        requestFunction( defer, key );
      }).promise();
      return cache[ key ].done( callback );
    }
  };
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
