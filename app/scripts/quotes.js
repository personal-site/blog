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
     * Local container object for quotes.
     * value of {@link quotes#get}.
     */
    quotes: {},

    /**
     * Init method.
     */
    init: function() {
      this.get('quotes', this._renderQuotes);
    },

    /**
     * AJAX wrapper to get data. Use {@link quotes#_path} to build the path.
     *
     * @param {string} type - The data type to get.
     * @param {Object} cb - Callback function to call when done.
     */
    get: function(type, cb) {
      var url;

      $.ajax({
        'url': this._path(type),
        'success': function(data) {
          this.quotes = data.quotes;
        }
      }).done(cb);
    },

    /**
     * Returns an HTTP datafile path.
     *
     * @param {string} type - The data type to get.
     * @returns {string} The datafile path.
     */
    _path: function(type) {
      var url;

      if (type === 'quotes') {
        url = 'https://cdn.rawgit.com/chrisvogt/49b51791348a09cbddb0/raw/585d1712885dda5c13d63c17b5e093d543640e42/book-quotes.json';
      }

      return url;
    },

    /**
     * Renders quotes from {@link quotes#quotes} onto the page.
     */
    _renderQuotes: function() {
      var $elem = $('#quote .orbit').empty();
      var frag = document.createDocumentFragment();

      $.each(this.quotes, function(i, quote) {
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
    }
  }
});
