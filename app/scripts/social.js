'use strict';

/**
 * SOCIAL module
 *
 * GET and RENDER social links
 *
 * @author Chris Vogt <mail@chrisvogt.me>
 */
$.extend( true, C1V0, {
  social: {

    /**
     * PROFILES container
     */
    profiles: {},

    /**
     * DATA path
     */
    path: 'https://chrisvogt.firebaseio.com/profiles.json',

    /**
     * CONTAINER element
     */
    $container: $('#social #links ul'),

    /**
     * INIT
     */
    init: function() {
      this.get('profiles', this._renderSocialList);
    },

    /**
     * AJAX wrapper
     *
     * @param {String}
     * @param {Object}
     */
    get: function(type, cb) {
      $.ajax({
        'url': this._getPath(type),
        'success': function(data) {
          this.profiles = data;
        }
      }).done(cb);
    },

    /**
     * PATH getter
     *
     * @param {String}
     */
    _getPath: function(type) {
      return this.path;
    },

    /**
     * RENDER social profile linkes
     */
    _renderSocialList: function() {
      var _profiles = this.profiles;
      var frag = document.createDocumentFragment();

      _profiles.forEach(function(profile) {
        var a = $('<a></a>', {
          'href': profile.href,
          'title': 'Chris Vogt on ' + profile.name
        });
        var i = $('<i class="' + profile.icon + '"></i>');
        var li = $('<li></li>').append(a);

        $(a).append(i);
        $(frag).append(li);
      });

      if (_profiles.length > 0) {
        $('#social #links ul').empty().append(frag);
      }
    }
  }
});

C1V0.social.init();
