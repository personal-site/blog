'use strict';

(function(){
	var Stats = {};

	Stats.init = function() {
		this.getHours();
		this.getProjects();
	};

	Stats.getHours = function() {
	    $.ajax({
	        url: 'https://stats.chrisvogt.me/reports/dashboard.json',
	        success: function(data) {
	            $('#stats-hours .v').text(data.totalHours);
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
