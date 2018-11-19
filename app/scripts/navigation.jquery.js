'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend(true, C1V0 || {}, {
  /**
   * Site navigation module.
   *
   * @namespace
   * @this {navigation}
   * @alias C1V0.navigation
   */
  navigation: {
    /**
     * Cache of commonly-accessed navigation objects.
     * @type {Object}
     */
    element: {
      /** @type {jQuery} Navigation component container. */
      $primaryNav: $('#primary-nav')
    },

    /** Initializer. */
    init() {
      $.scrollUp();
      this.fadableHeader();
    },

    /**
     * Fadable header
     *
     * On large screens: hides the header initially
     * and then fades it after scrolling.
     */
    fadableHeader() {
      const {$primaryNav} = this.element;

      $primaryNav.removeClass('sticky');

      $(document).on('scroll', () => {
        if ($(document).width() > 640) {
          if ($(document).scrollTop() > 420) {
            $primaryNav.addClass('sticky fixed');
          } else {
            $primaryNav.removeClass('sticky fixed');
            $('body').removeClass('f-topbar-fixed');
          }
        }
      });
    },

    /**
     * Sets the active class on a nav item.
     * @param  {jQuery.Event} e Click event.
     */
    makeActive(e) {
      const self = C1V0.navigation;
      const {$primaryNav} = self.element;

      $primaryNav
        .find('li')
        .removeClass('active');

      $(e.target)
        .parent('li')
        .addClass('active');
    },

    /**
     * Scrolling navigation
     *
     * Smooth scroll for the on-page navigation.
     */
    scrollingNav() {
      $('.top-bar .left a').click(e => {
        const goTo = $(this).attr('href');

        $('html, body').animate({
          scrollTop: $(goTo).offset().top
        }, 800);

        e.preventDefault();
      });
    }
  }
});

C1V0.navigation.init();
