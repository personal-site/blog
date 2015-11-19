'use strict';

(function() {
  var Projects = {};

  Projects.init = function() {
    $.ajax({
      url: 'https://projects.chrisvogt.me/api/1.2/all.json',
      success: function(data) {
        $('#project-list').empty();
        var frag = document.createDocumentFragment();

        $.each(data.projects, function(i, project) {
          // generate elements
          var li = document.createElement('li'),
            link = document.createElement('a'),
            thumb = document.createElement('img');

          // set attributes
          $(li).attr({
            'project-id': project.id,
            'project-name': project.name,
            'project-github': project.github,
            'project-demo': project.demo,
            'project-banner': project.banner,
            'project-tech': project.tech
          });
          $(link).attr({
            'href': project.github,
            'onClick': 'ga(\‘send\’, \‘event\’, \‘Projects\’, \'modal\', \'Portfolio\' );'
          });
          $(thumb).attr({
            'class': 'image-circle',
            'src': project.thumb
          });

          // matryoshka
          li.appendChild(link);
          link.appendChild(thumb);
          frag.appendChild(li);
        });

        $('#project-list')[0].appendChild(frag);

        $('ul#project-list a').click(function(e) {
          e.preventDefault();
          var project = e.target.parentElement.parentElement;

          $('#modal-project h3').text(project.getAttribute('project-name'));
          $('#modal-project img').attr({src: project.getAttribute('project-banner')});

          // build the tech bar
          if (project.getAttribute('project-tech')) {
            var techs = project.getAttribute('project-tech'),
                frag  = document.createDocumentFragment();

            $.each(techs.split(','), function(i, tech) {
              var li = document.createElement('li'),
                  t  = document.createTextNode(tech);

              li.className = tech;
              li.appendChild(t);
              frag.appendChild(li);
            });

            $('ul#tech').empty().append(frag);
          }

          // button: view source
          if (project.getAttribute('project-github')) {
            $('#modal-project .project-source').removeClass('disabled');
            $('#modal-project .project-source').attr({
              href: 'https://github.com/' + project.getAttribute('project-github'),
              title: project.getAttribute('project-name') + ' on GitHub'
            });
          } else {
            $('#modal-project .project-source').addClass('disabled');
          }

          // button: demo
          if (project.getAttribute('project-demo')) {
            $('#modal-project .project-demo').removeClass('disabled');
            $('#modal-project .project-demo').attr({
              href:  project.getAttribute('project-demo'),
              title: project.getAttribute('project-name') + ' live demo'
            });
          } else {
            $('#modal-project .project-demo').addClass('disabled');
          }

          // launch the modal
          $('[data-remodal-id=modal]').remodal({
            hashTracking: false
          }).open();
        });
      }
    });
  };

  Projects.init();
})();
