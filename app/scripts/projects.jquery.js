'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0 || {}, {
  /**
   * Projects module.
   *
   * @namespace
   * @this {projects}
   * @alias C1V0.quotes
   */
  projects: {
    /**
     * Path to the projects data.
     *
     * @type {string}
     */
    path: C1V0.config.projects,

    /**
     * HttpSocket container.
     *
     * @type {HttpSocket}
     */
    http: {},

    /** Initializer. */
    init() {
      this.http = new HttpSocket(this.path);
      this.http.get(this.render, this.failure);
    },

    /** Renders the projects index. */
    render: function() {
      // holds projects <ul>
      const frag = document.createDocumentFragment();

      // convert projects to an array of objects
      var projects = $.map(this.data, function(val) {
          return [val];
      });

      // iterate through data and build projects index
      $.each(projects, function(i, project) {
        const li = document.createElement('li'),
          link = document.createElement('a'),
          thumb = document.createElement('img');

        $(li).data(project);

        $(link).attr({
          'href': project.github_url,
          'class': 'hvr-shadow-radial'
        });
        $(thumb).attr({
          'alt': project.name,
          'class': 'radius',
          'src': project.thumb_url
        });

        // matryoshka
        li.appendChild(link);
        link.appendChild(thumb);
        frag.appendChild(li);
      });

      // append the newly generated collection of <li>s
      $('#projects .panel-loading').fadeOut(function() {
        $('#project-list').append(frag).fadeIn(1600);
        $('#projects .panel-controls').fadeIn();
        C1V0.projects.applyUIBindings();
      });
    },

    /** Sorts data by creation data. */
    sort: function(a, b) {
      return b.created.localeCompare( a.created );
    },

    /**
     * Handler for the projects drop down filters.
     *
     * @param {String}
     */
    filter: function(id, category) {
      let state = document.getElementById(id).checked,
          $items = $('#project-list li');

      for (var i = 0, max = $items.length; i < max; i += 1) {
        if ($.data($items[i], 'category') === category) {
          switch (state) {
            case false:
              $($items[i]).addClass('hidden');
              break;
            case true:
              $($items[i]).removeClass('hidden');
              break;
          }
        }
      }
    },

    /** Failure handler. Hides the loading panel and displays an error. */
    failure: function() {
      $('#projects .panel-loading').addClass('hidden');
      $('#projects .panel-unresolved').removeClass('hidden');
    },

    /** Applies event bindings. */
    applyUIBindings: function() {
      /** Project filter click handler. */
      $('#filters input[type=\'checkbox\']').change(function() {
        C1V0.projects.filter(this.id, $(this).data('category'));
      });

      /** Project thumbnail click handler.  */
      $('ul#project-list a').click(function(e) {
        var $project = $(e.target.parentElement.parentElement);

        e.preventDefault(); // disables hyperlink on thumbnail

        /** Logs a Google Analytics `Project Reviewed` event. */
        C1V0.analytics.sendEvent('Project', 'Reviewed', $project.data('name'));

        /** @function Updates the modal's content. */
        (function updateModal() {
          let $modal = $('#modal-project');

          $modal.find('h3').text($project.data('name'));
          $modal.find('.created').text('Created: ' + renderCreated($project.data('created')));
          $modal.find('.description').text($project.data('description'));
          $modal.find('img').attr({src: $project.data('banner_url')});
        })();

        /** @function Builds and renders the tech bar. */
        (function renderTechBar() {
          if ($project.data('tech')) {
            let techs = $project.data('tech'),
                frag  = document.createDocumentFragment();

            $.each(techs, function(i, tech) {
              const $li = $('<li></li>', {
                text: tech,
                class: `${tech} has-tip`,
                attr: {
                  'data-tooltip': '',
                  'aria-haspopup': true,
                  'title': tech
                },
                appendTo: frag
              });
            });

            $('ul#tech')
              .empty()
              .append(frag);

            $(document).foundation('tooltip', 'reflow');
          }
        })();

        /** @function Applies bindings to the project 'source' and 'demo' buttons. */
        (function applyButtonBindings() {
          if ($project.data('github_full_name')) {
            buttonHandler('source', $project);
          } else { // disable the 'source' button
            $('#modal-project .project-source')
              .addClass('disabled')
              .attr('disabled', 'disabled')
              .removeAttr('href');
          }
          if ($project.data('demo_url')) {
            buttonHandler('demo', $project);
          } else { // disable the 'demo' button
            $('#modal-project .project-demo')
              .addClass('disabled')
              .attr('disabled', 'disabled')
              .removeAttr('href');;
          }
        })();

        /**
         * Formats the created date using moment.js.
         *
         * @param {String}
         * @returns {String|Date} Returns a moment.js-formatted string or falls back to the default Date string.
         */
        function renderCreated(created) {
          /*global moment */
          return ( (typeof moment !== 'undefined') ? moment(created).startOf('day').fromNow() : new Date(created) );
        }

        /**
         * Button handler.
         *
         * @param {String} action The button action. Either `source` or `demo`.
         * @param {Object} project
         * @returns {jQuery}
         */
        function buttonHandler(action, project) {
          return $(`#modal-project .project-${action}`)
            .removeClass('disabled')
            .removeAttr('disabled')
            .attr(buildAttributes(action, project))
            .on('click', function() {
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
          let attr;

          if (action === 'source') {
              const gh = $project.data('github_full_name');
              const href = 'https://github.com/' + gh;
              const title = $project.data('name') + ' on GitHub';

              if (!gh) {
                attr = false;
              } else {
                attr = new Attributes(href, title);
              }
          } else if (action === 'demo') {
              const demo = $project.data('demo_url');

              if (!demo) {
                attr = false;
              } else {
                attr = new Attributes(demo, $project.data('name') + ' live demo');
              }
          }

          return attr;
        }

        /**
         * Contains a collection of attributes.
         *
         * @constructor
         * @param {String} href The hyperlink url for the button `href` attribute.
         * @param {String} title The label text for the button.
         */
        function Attributes(href, title) {
          this.href  = href;
          this.title = title;
        }

        /** Bind ZURB Foundation's Remodal to each thumbnail. */
        $('[data-remodal-id=modal]').remodal({
          hashTracking: false
        }).open();
      });
    }
  }
});

C1V0.projects.init();
