'use strict';

(function(){
	var Quotes = {};
	
	Quotes.init = function() {
	    $.ajax({
	        url: 'https://cdn.rawgit.com/chrisvogt/49b51791348a09cbddb0/raw/8e9cd6bc0b6261f3a1fc5fd65574d5d4e6468ecb/book-quotes.json',
	        success: function(data) {
				var $elem = $('#quote .orbit').empty(),
					frag = document.createDocumentFragment();

	            $.each(data.quotes, function(i, quote) {
	            	var li 	 = document.createElement( 'li' ),
            			div  = document.createElement( 'div' ),
            			bq 	 = document.createElement( 'blockquote' ),
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
	    });
	};

	Quotes.init();
})();
