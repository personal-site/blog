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
            this.scrollingNav();
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
          $('#primary-nav').removeClass('sticky');

    			$(document).on('scroll', function(){
    				if ($(document).width() > 640) {
    					if ($(document).scrollTop() > 420){
    						$('#primary-nav').addClass('sticky');
    					} else {
    						$('#primary-nav').removeClass('sticky fixed');
                $('body').removeClass('f-topbar-fixed');
    					}
    				}
    			});
    		},

        /**
         * Scrolling navigation
         *
         * Smooth scroll for the on-page navigation.
         */
        scrollingNav: function() {
          $('.top-bar .left a').click(function(){
            event.preventDefault();
            var toGo = $(this).attr('href');

            $('html, body').animate({
                scrollTop: $(toGo).offset().top
            }, 800);
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
