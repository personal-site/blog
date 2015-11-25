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
            'href': project.github
          });
          $(thumb).attr({
            'class': 'image-circle',
            'src': project.thumb
          });

          // bind analytics to click event
          $(link).on('click', function() {
            var ga = window.ga;
            ga('send', {
              hitType: 'event',
              eventCategory: 'Project',
              eventAction: 'Reviewed',
              eventLabel: project.github
            });
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
            var sourceBtn = $('#modal-project .project-source');
            sourceBtn.removeClass('disabled').attr({
              href: 'https://github.com/' + project.getAttribute('project-github'),
              title: project.getAttribute('project-name') + ' on GitHub'
            });
            $(sourceBtn).on('click', function() {
              var ga = window.ga;
              ga('send', {
                hitType: 'event',
                eventCategory: 'Project',
                eventAction: 'View Source',
                eventLabel: project.getAttribute('project-github')
              });
            });
          } else {
            $('#modal-project .project-source').addClass('disabled');
          }

          // button: demo
          if (project.getAttribute('project-demo')) {
            var demoBtn = $('#modal-project .project-demo');
            demoBtn.removeClass('disabled').attr({
              href:  project.getAttribute('project-demo'),
              title: project.getAttribute('project-name') + ' live demo'
            });
            $(demoBtn).on('click', function() {
              var ga = window.ga;
              ga('send', {
                hitType: 'event',
                eventCategory: 'Project',
                eventAction: 'View Demo',
                eventLabel: project.getAttribute('project-github')
              });
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
