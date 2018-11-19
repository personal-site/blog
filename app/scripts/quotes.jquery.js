'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend(true, C1V0 || {}, {
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
     *
     * @type {string}
     */
    path: C1V0.config.quotes,

    /**
     * Used to make HTTP requests.
     *
     * @type {object}
     */
    http: {},

    /** Initializer. */
    init() {
      this.http = new HttpSocket(this.path);
      this.http.get(this.renderQuotes, this.handleFailure);
    },

    /** Handles HTTP request failure. */
    handlefailure() {
      $('#quote').addClass('hidden');
    },

    /** Renders quotes from onto the page. */
    renderQuotes() {
      const $elem = $('#quote .orbit').empty();
      const frag = document.createDocumentFragment();
      const {quotes} = this.data;

      $.each(quotes, (i, quote) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const bq = document.createElement('blockquote');
        const cite = document.createElement('cite');

        bq.innerHTML = quote.text;
        cite.innerHTML = quote.cite;

        li
          .appendChild(div)
          .appendChild(bq)
          .appendChild(cite);

        frag.appendChild(li);
      });

      $elem.append(frag);
      $(document).foundation('orbit', 'reflow');
    }
  }
});

C1V0.quotes.init();
