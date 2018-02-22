'use strict';

/**
 * @function
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0 || {}, {
  /**
   * Social profiles module.
   * @namespace
   * @this {social}
   * @alias C1V0.social
   */
  social: {
    /**
     * HTTP data path.
     */
    path: C1V0.config.social,

    /**
     * jQuery reference to the social links list.
     *
     * @type {object}
     */
    $container: $('#social #links ul'),

    /** Initializer. */
    init() {
      this.http = new HttpSocket(C1V0.social.path);
      this.http.get(C1V0.social.renderSocialList, C1V0.social.handleFailure);
    },

    /** Handles HTTP request failure. */
    handleFailure() {
      $('#social').addClass('hidden');
    },

    /** Renders social profile links onto the page. */
    renderSocialList() {
      const profiles = [...this.data];
      const frag = document.createDocumentFragment();

      if (profiles.length < 1) {
        this.failure();
      }

      profiles.forEach(profile => {
        const { href, icon, name } = profile;
        const $hyperlink = $('<a></a>', {
          href: href,
          rel: 'me',
          title: `Chris Vogt on ${ name }`
        });
        const $icon = $(`<i class="${ icon }"></i>`);
        const $listItem = $('<li></li>').append($hyperlink);

        $($hyperlink).append($icon);
        $(frag).append($listItem);
      });

      $('#social #links ul').empty().append(frag);
    }
  }
});

C1V0.social.init();
