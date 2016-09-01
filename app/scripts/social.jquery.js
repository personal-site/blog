'use strict';

/**
 * @function
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0, {
  /**
   * Class representing social links.
   *
   * @class
   * @extends C1V0
   * @author Chris Vogt <mail@chrisvogt.me>
   */
  social: {
    /**
     * HTTP data path.
     */
    path: 'https://chrisvogt.firebaseio.com/profiles.json',

    /**
     * jQuery reference to the social links list.
     */
    $container: $('#social #links ul'),

    /**
     * Init method.
     */
    init: function() {
      this.http = new HttpSocket(this.path);
      this.http.get(this.renderSocialList);
    },

    /**
     * Renders social profile links onto the page.
     *
     * @return {boolean}
     */
    renderSocialList: function() {
      const profiles = [...this.data];
      const frag = document.createDocumentFragment();

      profiles.forEach(function(profile) {
        const a = $('<a></a>', {
          'href': profile.href,
          'title': 'Chris Vogt on ' + profile.name
        });
        const i = $('<i class="' + profile.icon + '"></i>');
        const li = $('<li></li>').append(a);

        $(a).append(i);
        $(frag).append(li);
      });

      if (profiles.length > 0) {
        $('#social #links ul').empty().append(frag);
        return true;
      } else {
        return false;
      }
    }
  }
});
