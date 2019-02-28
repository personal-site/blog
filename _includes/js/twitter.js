export default () => {
  /**
   * Twitter API
   *
   * @link https://dev.twitter.com/overview/documentation
   */
  window.twttr = (function (d, s, id) {
    const t = window.twttr || {};

    if (d.querySelector(id)) {
      return t;
    }

    /* eslint-disable unicorn/prefer-query-selector */
    let js = d.getElementsByTagName(s)[0];
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://platform.twitter.com/widgets.js';

    const fjs = d.getElementsByTagName(s)[0];
    fjs.parentNode.insertBefore(js, fjs);
    /* eslint-enable unicorn/prefer-query-selector */

    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t;
  })(document, 'script', 'twitter-wjs');
};
