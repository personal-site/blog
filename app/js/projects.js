'use strict';

(function() {
  /**
   * @class
   */
  var Projects = {};

  /**
   * Initializes the projects pane.
   *
   * @function
   */
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

          // matryoshka
          li.appendChild(link);
          link.appendChild(thumb);
          frag.appendChild(li);
        });

        // append the newly generated collection of <li>s
        $('#project-list')[0].appendChild(frag);

        // bind click events to the projects
        $('ul#project-list a').click(function(e) {
          e.preventDefault();
          var project = e.target.parentElement.parentElement;

          // fire an Analytics event
          sendEvent('Project', 'Reviewed', project.getAttribute('project-name'));

          // update modal content
          $('#modal-project h3').text(project.getAttribute('project-name'));
          $('#modal-project img').attr({src: project.getAttribute('project-banner')});

          // build's the modal tech bar
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

            // empty and append the tech bar
            $('ul#tech').empty().append(frag);
          }

          // button factory
          if (project.getAttribute('project-github')) {
            buttonHandler('source', project);
          } else {
            $('#modal-project .project-source').addClass('disabled');
          }
          if (project.getAttribute('project-demo')) {
            buttonHandler('demo', project);
          } else {
            $('#modal-project .project-demo').addClass('disabled');
          }

          /**
           * Button handler.
           *
           * @param {string} action
           * @param {Object} project
           */
          function buttonHandler(action, project) {
            var btn = $('#modal-project .project-' + action);

            btn.removeClass('disabled');
            btn.attr(buildAttributes(action, project));

            btn.on('click', function() {
              sendEvent('Project', action, project.getAttribute('project-name'));
            });

          }

          /**
           * Generates the appropriate set of attributes.
           *
           * @param {string} action
           * @param {Object} project
           */
          function buildAttributes(action, project) {
            var attr;

            switch (action) {
              case 'source':
                var gh = project.getAttribute('project-github');
                if (!gh) {
                  return false;
                }
                attr = new Attributes(
                  'https://github.com/' + gh,
                  project.getAttribute('project-name') + ' on GitHub'
                );
                break;
              case 'demo':
                var d = project.getAttribute('project-demo');
                if (!d) {
                  return false;
                }
                attr = new Attributes(
                  d,
                  project.getAttribute('project-name') + ' live demo'
                );
                break;
            }

            return attr;
          }

          /**
           * Attributes collection
           *
           * @constructor
           * @param {string} href
           * @param {string} title
           */
          function Attributes(href, title) {
            this.href  = href;
            this.title = title;
          }

          // launch the modal
          $('[data-remodal-id=modal]').remodal({
            hashTracking: false
          }).open();

        });

        /**
         * Fires off a Google Analytics event.
         *
         * @param {string} category
         * @param {string} action
         * @param {string} gh - source code url
         */
        function sendEvent(category, action, gh) {
          var ga = window.ga;
          ga('send', {
            hitType: 'event',
            eventCategory: category,
            eventAction: defineAction(action),
            eventLabel: gh
          });

          /**
           * Sanitizes the action names.
           *
           * @param {string} action
           */
          function defineAction(action) {
            if (action.toLowerCase() === 'reviewed') {
              return action.capitalize();
            } else {
              return 'View ' + action.capitalize();
            }
          }
          return true;
        }
      }
    });
  };

  Projects.init();

  /** Capitalize the first letter of a string **/
  String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };
})();
