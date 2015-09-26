'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
            // needed to use joyride
            // doc: http://foundation.zurb.com/docs/components/joyride.html
            $(document).on('click', '#start-jr', function () {
                $(document).foundation('joyride', 'start');
            });
			_userAgentInit();

			document.querySelector('.menu-button').onclick = function(e) {
			   e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
			}
			
			var items = document.querySelectorAll('.circle a');
			for(var i = 0, l = items.length; i < l; i++) {
			  items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
			  items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
			}
		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
})();
