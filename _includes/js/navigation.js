export default () => {
  /**
   * Cache of commonly-accessed navigation objects.
   * @type {Object}
   */
  const element = {
    /** @type {jQuery} Navigation component container. */
    $primaryNav: $('#primary-nav')
  };

  /**
   * Fadable header
   *
   * On large screens: hides the header initially
   * and then fades it after scrolling.
   */
  const fadableHeader = () => {
    const {
      $primaryNav
    } = element;

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
  };

  $.scrollUp();
  fadableHeader();
};
