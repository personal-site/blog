'use strict';

/**
 * @ignore
 * @name jQuery#extend
 * @description This documents the jQuery method adds the Social class to the C1V0 namespace.
 */
$.extend( true, C1V0 || {}, {
  /**
   * Projects module.
   * @namespace
   * @this {projects}
   * @alias C1V0.quotes
   */
  projects: {

    /**
     * Path to the projects data.
     * @type {string}
     */
    path: 'https://chrisvogt.firebaseio.com/projects.json',

    /**
     * HttpSocket container.
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
      var frag = document.createDocumentFragment();

      // convert to an array of objects
      var d = $.map(this.data, function(val) {
          return [val];
      });

      // sort data by `created`
      d.sort(function(a, b) {
        return b.created.localeCompare( a.created );
      });

      // iterate through data and build projects index
      $.each(d, function(i, project) {
        var li = document.createElement('li'),
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
      $('#projects .panel-loading').fadeOut();
      $('#project-list').empty().append(frag).fadeIn(1600);
      $('#projects .panel-controls').fadeIn();
      $('#btnFilter').delay(800).fadeIn();

      // attach event bindings
      C1V0.projects.applyUIBindings();
    },

    /**
     * Handler for the projects drop down filters.
     *
     * @param {string}
     */
    filter: function(filterId) {
      var category = filterId.replace('filter', '').toLowerCase(),
          state = document.getElementById(filterId).checked,
          $items = $('#project-list li');

      for (var i = 0; i < $items.length; i++) {
        if ($.data($items[i], 'category') === category.singularize()) {
          switch (state) {
            case false:
              $($items[i]).children().fadeOut();
              break;
            case true:
              $($items[i]).children().fadeIn();
              break;
          }
        }
      }
    },

    failure: function() {
      $('#projects .panel-loading').fadeOut();
      $('#projects .panel-unresolved').removeClass('hidden');
    },

    applyUIBindings: function() {
      /* Project index filters */
      $('#filters input[type=\'checkbox\']').change(function() {
        C1V0.projects.filter(this.id);
      });

      // click on a project
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

            $(li).attr('data-tooltip', '');
            li.className = tech + ' has-tip';
            $(li).attr('aria-haspopup', true);
            $(li).attr('title', tech);

            li.appendChild(t);
            frag.appendChild(li);
          });

          // empty and append the tech bar
          $('ul#tech').empty().append(frag);
          $(document).foundation('tooltip');
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
    }
  }
});

C1V0.projects.init();
