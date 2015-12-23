'use strict';

(function() {
  /**
   * Projects container.
   *
   * @var {Object}
   */
  var Projects = {};

  /**
   * Initializes the projects pane.
   *
   * @function
   */
  Projects.init = function() {
    $.ajax({
      url: 'https://chrisvogt.firebaseio.com/projects.json',
      success: function(data) {
        var frag = document.createDocumentFragment();

        // convert to an array of objects
        var d = $.map(data, function(val) {
            return [val];
        });

        // sort data by `created`
        d.sort(function(a, b) {
          return b.created.localeCompare( a.created );
        });

        $.each(d, function(i, project) {
          var li = document.createElement('li'),
            link = document.createElement('a'),
            thumb = document.createElement('img');

          $(li).data(project);

          $(link).attr({
            'href': project.github_url,
            'class': 'hvr-float-shadow'
          });
          $(thumb).attr({
            'class': 'image-circle',
            'src': project.thumb_url
          });

          // matryoshka
          li.appendChild(link);
          link.appendChild(thumb);
          frag.appendChild(li);
        });

        // append the newly generated collection of <li>s
        $('#projects .spinner').fadeOut();
        $('#project-list').empty().append(frag).hide().fadeIn(1600);

        // bind click events to the projects
        $('ul#project-list a').click(function(e) {
          e.preventDefault();
          var $project = $(e.target.parentElement.parentElement);

          // fire an Analytics event
          sendEvent('Project', 'Reviewed', $project.data('name'));

          // update modal content
          $('#modal-project h3').text($project.data('name'));
          $('#modal-project .created').text('Created: ' + renderCreated($project.data('created')));
          $('#modal-project .description').text($project.data('description'));
          $('#modal-project img').attr({src: $project.data('banner_url')});

          // build's the modal tech bar
          if ($project.data('tech')) {
            var techs = $project.data('tech'),
                frag  = document.createDocumentFragment();

            $.each(techs, function(i, tech) {
              var li = document.createElement('li'),
                  t  = document.createTextNode(tech);

              li.className = tech + ' has-tip';
              $(li).attr('aria-haspopup', true);
              $(li).attr('data-tooltip');
              $(li).attr('title', tech);

              li.appendChild(t);
              frag.appendChild(li);
            });

            // empty and append the tech bar
            $('ul#tech').empty().append(frag);
          }

          // button factory
          if ($project.data('github_full_name')) {
            buttonHandler('source', $project);
          } else {
            $('#modal-project .project-source').addClass('disabled');
          }
          if ($project.data('demo_url')) {
            buttonHandler('demo', $project);
          } else {
            $('#modal-project .project-demo').addClass('disabled');
          }

          /**
           * Formats the created date using moment.js.
           *
           * @param {String}
           * @returns {String|Date}
           */
          function renderCreated(created) {
            /*global moment */
            return ( (typeof moment !== 'undefined') ? moment(created).startOf('day').fromNow() : new Date(created) );
          }

          /**
           * Button handler.
           *
           * @param {String} action
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
           * @param {String} action
           * @param {Object} $project
           */
          function buildAttributes(action, $project) {
            var attr;

            switch (action) {
              case 'source':
                var gh = $project.data('github_full_name');
                if (!gh) {
                  return false;
                }
                attr = new Attributes(
                  'https://github.com/' + gh,
                  $project.data('name') + ' on GitHub'
                );
                break;
              case 'demo':
                var d = $project.data('demo_url');
                if (!d) {
                  return false;
                }
                attr = new Attributes(
                  d,
                  $project.data('name') + ' live demo'
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
