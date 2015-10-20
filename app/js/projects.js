'use strict';

(function(){
	var Projects = {};

	Projects.init = function() {
	    $.ajax({
	        url: 'https://projects.chrisvogt.me/api/1.1/all.json',
	        success: function(data) {
	            $('#project-list').empty();
	            var frag = document.createDocumentFragment();

	            $.each(data.projects, function(i, project) {
	            	// generate elements
	            	var li 		= document.createElement( 'li' ),
	            		link 	= document.createElement( 'a' ),
	            		thumb 	= document.createElement( 'img' );
	            	
	            	// set attributes
	            	$(li).attr({
	            		'project-id': project.id,
	            		'project-name': project.name,
	            		'project-github': project.github,
	            		'project-demo': project.demo,
	            		'project-banner': project.banner
	            	});
	            	$(link).attr('href', '#modal');
	            	$(thumb).attr({
	            		'class': 'image-circle',
	            		'src': project.thumb
	            	});

	            	// matryoshka
	            	li.appendChild( link );
	            	link.appendChild( thumb );
	            	frag.appendChild(li);
	            });

            	$('#project-list')[0].appendChild( frag );

				$( 'ul#project-list a' ).click(function(e) {
					e.preventDefault();
					var li = e.target.parentElement.parentElement;
					$('#modal-project h3').text(li.getAttribute('project-name'));
					$('#modal-project img').attr({src: li.getAttribute('project-banner')});
					if (li.getAttribute('project-github')) {
						$('#modal-project .project-source').removeClass('disabled');
						$('#modal-project .project-source').attr({
							href: 'https://github.com/' + li.getAttribute('project-github'),
							title: li.getAttribute('project-name') + ' on GitHub'
						});
					} else {
						$('#modal-project .project-source').addClass('disabled');
					}
					if (li.getAttribute('project-demo')) {
						$('#modal-project .project-demo').removeClass('disabled');
						$('#modal-project .project-demo').attr({
							href: li.getAttribute('project-demo'),
							title: li.getAttribute('project-name') + ' live demo'
						});
					} else {
						$('#modal-project .project-demo').addClass('disabled');
					}
					$('[data-remodal-id=modal]').remodal({hashTracking: false}).open();
				});
	        }
	    });
	};

	Projects.init();
})();