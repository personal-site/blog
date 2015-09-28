'use strict';

(function(){
	var Projects = {};
	Projects.init = function() {
	    $.ajax({
	        url: "https://projects.chrisvogt.me/api/1.1/all.json",
	        success: function(data) {
	            $('#project-list').empty();
	            $.each(data['projects'], function(i) {
	            	var project = data['projects'][i],
	            		item = $("<li>", {
	            			"project-id": project['id'],
	            			"project-github": project['github'],
	            			"project-demo": project['demo'],
	            			"project-banner": project['banner'],
	            			"project-name": project['name'],
	            			html: $("<a>", {
	            				href: "#modal",
	            				html: $("<img>", {
	            					class: "image-circle",
	            					src: project['thumb']
	            				})
	            			})
	            		});
	            	$("#project-list").append(item)
	            });
				$( "ul#project-list a" ).click(function(e) {
					e.preventDefault();
					var li = e.target.parentElement.parentElement;
					console.log(li.getAttribute("project-name"));
					$("#modal-project h3").text(li.getAttribute("project-name"));
					$("#modal-project img").attr({src: li.getAttribute("project-banner")});
					$("#modal-project .project-source").attr({
						href: "https://github.com/" + li.getAttribute("project-github"),
						title: li.getAttribute("project-name") + " on GitHub"
					});
					$("#modal-project .project-demo").attr({
						href: li.getAttribute("project-demo"),
						title: li.getAttribute("project-name") + " live demo"
					});
					$("[data-remodal-id=modal]").remodal({hashTracking: false}).open();
				});
	        }
	    });
	}

	Projects.init();
})();