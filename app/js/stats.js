'use strict';

(function(){
	var Stats = {};

	Stats.init = function() {
		this.getHours();
		this.getProjects();
	};

	Stats.getHours = function() {
	    $.ajax({
	        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fstats.chrisvogt.me%2Freports%2Fdashboard.json%22&diagnostics=true',
	        success: function(data) {
            var $t = $(data).find('totalTimeInWords').text().split(', ');
            $('#stats-hours .v').text($t[0].replace(/\D/g,''));
	        }
	    });
	};

	Stats.getProjects = function() {
	    $.ajax({
	        url: 'https://projects.chrisvogt.me/api/1.0/all.json',
	        success: function(data) {
	        	$('#stats-projects .v').text(data.projects.length);
	        }
	    });
	};

	Stats.init();
})();
