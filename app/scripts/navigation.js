'use strict';

/**
 * NAVIGATION module
 *
 * @author Chris Vogt <mail@chrisvogt.me>
 */
$.extend( true, C1V0, {
  navigation: {

    init: function() {
      this._fadableHeader();
      this._scrollingNav();
    },

    /**
     * Fadable header
     *
     * On large screens: hides the header initially
     * and then fades it after scrolling.
     */
    _fadableHeader: function() {
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
    _scrollingNav: function() {
      $('.top-bar .left a').click(function(){
        event.preventDefault();
        var toGo = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(toGo).offset().top
        }, 800);
      });
    },
  }
});

C1V0.navigation.init();
