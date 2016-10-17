/**
 * Google Analytics
 *
 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/
 */
window.ga = window.ga || function() {
    (ga.q = ga.q || []).push(arguments)
};
ga.l = +new Date;
ga('create', C1V0.config.analytics, 'auto', {
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
