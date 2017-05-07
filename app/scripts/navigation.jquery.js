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
    init: function() {
      $.scrollUp();
      this.fadableHeader();
//      this.scrollingNav();
      this.applyUIBindings();
    },

    /**
     * Fadable header
     *
     * On large screens: hides the header initially
     * and then fades it after scrolling.
     */
    fadableHeader: function() {
      const $primaryNav = this.element.$primaryNav;

      $primaryNav.removeClass('sticky');

      $(document).on('scroll', function() {
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
    makeActive: function(e) {
      let self = C1V0.navigation;
      const $primaryNav = self.element.$primaryNav;

      $primaryNav
        .find('li')
        .removeClass('active');
      $(e.target).parent('li').addClass('active');
    },

    /**
     * Scrolling navigation
     *
     * Smooth scroll for the on-page navigation.
     */
    scrollingNav: function() {
      $('.top-bar .left a').click(function(e) {
        const goTo = $(this).attr('href');

        $('html, body').animate({
          scrollTop: $(goTo).offset().top
        }, 800);

        e.preventDefault();
      });
    },

    /**
     * Apply UI event bindings.
     */
    applyUIBindings: function() {
      /*
      const $items = this.element.$primaryNav.find('li');

      $.each($items, function() {
        $(this).on('click', C1V0.navigation.makeActive);
      });
      */
    }
  }
});

C1V0.navigation.init();
