'use strict';

/**
 * QUOTES module
 *
 * GET and RENDER quotes on www.chrisvogt.me
 *
 * @author Chris Vogt <mail@chrisvogt.me>
 *
 */
$.extend( true, C1V0, {
  quotes: {

    /**
     * QUOTES container
     */
    quotes: {},

    /**
     * INIT method
     */
    init: function() {
      this.get('quotes', this._renderQuotes);
    },

    /**
     * AJAX wrapper
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
     * Returns an HTTP datafile path
     */
    _path: function(type) {
      var url;

      if (type === 'quotes') {
        url = 'https://cdn.rawgit.com/chrisvogt/49b51791348a09cbddb0/raw/585d1712885dda5c13d63c17b5e093d543640e42/book-quotes.json';
      }

      return url;
    },

    /**
     * Renders QUOTE data
     */
    _renderQuotes: function() {
      var $elem = $('#quote .orbit').empty();
      var frag = document.createDocumentFragment();

      console.log(this.quotes);

      $.each(this.quotes, function(i, quote) {
        var li   = document.createElement( 'li' ),
          div  = document.createElement( 'div' ),
          bq   = document.createElement( 'blockquote' ),
          cite = document.createElement( 'cite' );

      bq.innerHTML   = quote.text;
      cite.innerHTML = quote.cite ;

      li.appendChild( div )
        .appendChild( bq )
        .appendChild( cite );

        frag.appendChild( li );
      });

      $elem.append( frag );
      $(document).foundation('orbit', 'reflow');
    }
  }
});

C1V0.quotes.init();
