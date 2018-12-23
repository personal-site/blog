export default () => {
  /**
   * Twitter API
   *
   * @link https://dev.twitter.com/overview/documentation
   */
  window.twttr = (function (d, s, id) {
    const t = window.twttr || {};

    if (d.getElementById(id)) {
      return t;
    }

    let js = d.getElementsByTagName(s)[0];
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://platform.twitter.com/widgets.js';

    const fjs = d.getElementsByTagName(s)[0];
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t;
  })(document, 'script', 'twitter-wjs');
};
