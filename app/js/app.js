'use strict';

/**
 * Quartzite
 *
 * The new CHRISVOGT.me website.
 *
 * @author Chris Vogt <mail@chrisvogt.me>
 * @license MIT
 */
;(function($, window, document, undefined) {

	/**
	 * Plugin defaults
	 */
    var pluginName = 'quartzite',
        defaults = {
            propertyName: 'value'
        },
        docElem = document.documentElement;

    /**
     * Plugin constructor
     *
     * @constructor
     */
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = { // member functions

    	/**
    	 * Initialization
    	 */
        init: function() {
            this._userAgentInit();
            this.fadableHeader();
        },

        /**
         * Browser detection
         */
		_userAgentInit: function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},

		/**
		 * Fadable header
		 *
		 * On large screens: hides the header initially
		 * and then fades it after scrolling.
		 */
		fadableHeader: function() {
			if ($(document).width() < 640) {
				$('.top-bar').fadeIn();
				return true;
			}
			$(document).on('scroll', function(){
				if ($(document).width() > 640) {
					if ($(document).scrollTop() > 200){
						$('.top-bar').fadeIn();
					} else {
						$('.top-bar').fadeOut();
					}
				}
			});
		},

    };

    /**
     * Plugin wrapper
     *
     * Prevents multiple instantiations.
     */
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
