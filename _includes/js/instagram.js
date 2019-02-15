export default ({config, jQuery}) => {
  const {
    instagram: {
      accessToken,
      clientId,
      userId
    } = {}
  } = config;

  try {
    if (!accessToken || !clientId || !userId) {
      throw new Error('An access_token, client_id and user_id are required.');
    }

    /**
     * Instagram via instafeed.js
     *
     * @link https://instafeedjs.com/
     */
    const userFeed = new Instafeed({
      get: 'user',
      accessToken,
      clientId,
      userId,
      sortBy: 'most-recent',
      limit: 18,
      template: '<li><a href="{{link}}" class="hvr-shadow-radial" title="View on Instagram"><img src="{{image}}" alt="{{caption}}"></a></li>',
      success: () => {
        jQuery('#photos').removeClass('hidden');
        jQuery('#photos .js-load-more').click(() => {
          if (feed && typeof feed.next === 'function') {
            feed.next();
          }
        });
      },
      error: err => {
        console.warn('Error loading Instafeed', err);
        jQuery('#primary-nav a[href="#photos"]').parent('li').addClass('hidden');
      }
    });

    userFeed.run();
    window.feed = userFeed;
  } catch (error) {
    console.warn('Error loading Instagram component', error);
  }
};
