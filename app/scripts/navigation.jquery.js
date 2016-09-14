'use strict';

/**
 * @function
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend(true, C1V0 || {}, {
  /**
   * Site navigation module.
   * @module
   * @this {navigation}
   * @alias C1V0.navigation
   */
  navigation: {

    /** Initializer. */
    init: function() {
      $.scrollUp();
      this.fadableHeader();
      this.scrollingNav();
    },

    /**
     * Fadable header
     *
     * On large screens: hides the header initially
     * and then fades it after scrolling.
     */
    fadableHeader() {
      $('#primary-nav').removeClass('sticky');

      $(document).on('scroll', function() {
        if ($(document).width() > 640) {
          if ($(document).scrollTop() > 420) {
            $('#primary-nav').addClass('sticky fixed');
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
    scrollingNav() {
      $('.top-bar .left a').click(function(e) {
        e.preventDefault();
        const goTo = $(this).attr('href');

        $('html, body').animate({
          scrollTop: $(goTo).offset().top
        }, 800);
      });
    },
  }
});

C1V0.navigation.init();
