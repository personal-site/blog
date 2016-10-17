'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0 || {}, {
  /**
   * Social profiles module.
   *
   * @namespace
   * @this {quotes}
   * @alias C1V0.quotes
   */
  quotes: {

    /**
     * Path to the quotes data.
     * @type {string}
     */
    path: C1V0.config.quotes,

    /**
     * Used to make HTTP requests.
     * @type {object}
     */
    http: {},

    /** Initializer. */
    init() {
      this.http = new HttpSocket(this.path);
      this.http.get(this.renderQuotes, this.failure);
    },

    /**
     * Renders quotes from onto the page.
     */
    renderQuotes() {
      const $elem = $('#quote .orbit').empty();
      const frag = document.createDocumentFragment();

      $.each(this.data.quotes, function(i, quote) {
        const li   = document.createElement('li'),
          div    = document.createElement('div'),
          bq     = document.createElement('blockquote'),
          cite   = document.createElement('cite');

        bq.innerHTML   = quote.text;
        cite.innerHTML = quote.cite ;

        li.appendChild(div)
          .appendChild(bq)
          .appendChild(cite);

        frag.appendChild(li);
      });

      $elem.append(frag);
      $(document).foundation('orbit', 'reflow');

      if (this.data.quotes.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },

  /** Handles HTTP request failure. */
  failure() {
    $('#quote').addClass('hidden');
  }
});

C1V0.quotes.init();
