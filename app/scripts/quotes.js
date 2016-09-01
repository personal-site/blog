'use strict';

/**
 * @function
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0, {
  /**
   * Class representing quotes.
   * @extends C1V0
   * @author Chris Vogt <mail@chrisvogt.me>
   */
  quotes: {

    /**
     * Path to the quotes data.
     * @type {string}
     */
    path: 'https://cdn.rawgit.com/chrisvogt/49b51791348a09cbddb0/raw/585d1712885dda5c13d63c17b5e093d543640e42/book-quotes.json',

    /**
     * Used to make HTTP requests.
     * @type {object}
     */
    http: {},

    /**
     * Init method.
     */
    init: function() {
      this.http = new HttpSocket(this.path);
      this.http.get(this.renderQuotes);
    },

    /**
     * Renders quotes from onto the page.
     */
    renderQuotes: function() {
      var $elem = $('#quote .orbit').empty();
      var frag = document.createDocumentFragment();

      $.each(this.data.quotes, function(i, quote) {
        var li   = document.createElement('li'),
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
  }
});
