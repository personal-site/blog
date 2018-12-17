const latestCommit = require('./latest-commit');

(() => {
  $(document).foundation();

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

  $(document).foundation({
    'magellan-expedition': {
      /* eslint-disable camelcase */
      active_class: 'active',
      threshold: false,
      destination_threshold: 20,
      throttle_delay: 50,
      fixed_top: 0,
      offset_by_height: true
      /* eslint-enable camelcase */
    }
  });

  /**
   * Instagram via instafeed.js
   *
   * @link https://instafeedjs.com/
   */
  const userFeed = new Instafeed({
    get: 'user',
    userId: '1546421127',
    clientId: '7e07fcf783e746b3a236341049fa3cc0',
    accessToken: '1546421127.1677ed0.362078a0d37a4fcb8bcbf520a4459cdd',
    sortBy: 'most-recent',
    limit: 18,
    template: '<li><a href="{{link}}" class="hvr-shadow-radial" title="View on Instagram"><img src="{{image}}" alt="{{caption}}"></a></li>',
    success: () => {
      $('#photos').removeClass('hidden');
      $('#photos .js-load-more').click(() => {
        if (feed && typeof feed.next === 'function') {
          feed.next();
        }
      });
    },
    error: err => {
      console.warn('Error loading Instagram photos', err);
      $('#primary-nav a[href="#photos"]').parent('li').addClass('hidden');
    }
  });
  userFeed.run();
  window.feed = userFeed;
})();
