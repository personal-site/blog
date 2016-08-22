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
     * Local container object for social profiles data.
     * retrieved using {@link social#get}.
     */
    profiles: {},

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
      this.get('profiles', this._renderSocialList);
    },

    /**
     * AJAX wrapper to get data. Use {@link social#_path} to build the path.

     * @param {string} type - The data type to get.
     * @param {Object} cb - Callback function to call when done.
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
     * Getter method for the HTTP datafile path.
     *
     * @param {string} type - The data type to get.
     * @returns {string} The datafile from {@link social#path}.
     */
    _getPath: function(type) {
      return this.path;
    },

    /**
     * Renders social profile links from {@link social#profiles} onto the page.
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
