export default () => {
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
};
