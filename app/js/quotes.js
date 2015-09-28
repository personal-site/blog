'use strict';

(function(){
	var Quotes = {};
	Quotes.init = function() {
	    $.ajax({
	        url: "https://cdn.rawgit.com/chrisvogt/49b51791348a09cbddb0/raw/8e9cd6bc0b6261f3a1fc5fd65574d5d4e6468ecb/book-quotes.json",
	        success: function(data) {
	            var quote = $('#quote .orbit');

	            quote.empty();
	            $.each(data['quotes'], function(i) {
	            	quote.append($("<li>", {
	            		html: "<div><blockquote>" + data['quotes'][i]['text'] + "<cite>" + data['quotes'][i]['cite'] + "</cite></blockquote></div>"
	            	}));
	            });
	            $(document).foundation();
	            $(document).foundation('orbit', 'reflow');
	        }
	    });
	}

	 Quotes.init();
})();

