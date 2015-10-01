'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
			$.stellar('.hero');
			$.stellar('#projects');
			if ($(document).width() < 640) {
				$(".top-bar").fadeIn();
			}
			_userAgentInit();
		    $.scrollUp();
		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/platform.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	$( "#project-list li" ).hover(
	  function() {
	    $( this ).addClass( "hover" );
	  }, function() {
	    $( this ).removeClass( "hover" );
	  }
	);
	$(document).on("scroll", function(){
		if ($(document).width() > 640) {
			if ($(document).scrollTop() > 200){
				$(".top-bar").fadeIn();
			} else {
				$(".top-bar").fadeOut();
			}
		}
	});
})();