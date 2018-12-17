(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _latestCommit = require('./latest-commit');

var _latestCommit2 = _interopRequireDefault(_latestCommit);

var _latestRepos = require('./latest-repos');

var _latestRepos2 = _interopRequireDefault(_latestRepos);

var _navigation = require('./navigation');

var _navigation2 = _interopRequireDefault(_navigation);

var _quotes = require('./quotes');

var _quotes2 = _interopRequireDefault(_quotes);

var _recentlyRead = require('./recently-read');

var _recentlyRead2 = _interopRequireDefault(_recentlyRead);

var _socialProfiles = require('./social-profiles');

var _socialProfiles2 = _interopRequireDefault(_socialProfiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  $(document).foundation();

  /**
   * Twitter API
   *
   * @link https://dev.twitter.com/overview/documentation
   */
  window.twttr = function (d, s, id) {
    var t = window.twttr || {};

    if (d.getElementById(id)) {
      return t;
    }

    var js = d.getElementsByTagName(s)[0];
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://platform.twitter.com/widgets.js';

    var fjs = d.getElementsByTagName(s)[0];
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t;
  }(document, 'script', 'twitter-wjs');

  $(document).foundation({
    'magellan-expedition': {
      /* eslint-disable camelcase */
      active_class: 'active',
      threshold: false,
      destination_threshold: 20,
      throttle_delay: 50,
      fixed_top: 0,
      offset_by_height: true
      /* eslint-enable camelcase */
    }
  });

  /**
   * Instagram via instafeed.js
   *
   * @link https://instafeedjs.com/
   */
  var userFeed = new Instafeed({
    get: 'user',
    userId: '1546421127',
    clientId: '7e07fcf783e746b3a236341049fa3cc0',
    accessToken: '1546421127.1677ed0.362078a0d37a4fcb8bcbf520a4459cdd',
    sortBy: 'most-recent',
    limit: 18,
    template: '<li><a href="{{link}}" class="hvr-shadow-radial" title="View on Instagram"><img src="{{image}}" alt="{{caption}}"></a></li>',
    success: function success() {
      $('#photos').removeClass('hidden');
      $('#photos .js-load-more').click(function () {
        if (feed && typeof feed.next === 'function') {
          feed.next();
        }
      });
    },
    error: function error(err) {
      console.warn('Error loading Instagram photos', err);
      $('#primary-nav a[href="#photos"]').parent('li').addClass('hidden');
    }
  });
  userFeed.run();
  window.feed = userFeed;
})();

},{"./latest-commit":2,"./latest-repos":3,"./navigation":4,"./quotes":5,"./recently-read":6,"./social-profiles":7}],2:[function(require,module,exports){
'use strict';

(async function (jQuery) {
  var dom = {
    select: document.querySelector.bind(document)
  };

  var username = 'chrisvogt';
  var response = await $.getJSON({ url: 'https://api.github.com/users/' + username + '/events/public' });

  var latestPushEvent = response.find(function (event) {
    return event.type === 'PushEvent';
  });
  var repo = latestPushEvent.repo,
      payload = latestPushEvent.payload,
      createdAt = latestPushEvent.created_at;


  var latestCommit = payload.commits.reverse()[0];
  if (!latestCommit) {
    dom.select('#latest-commit').textContent = 'No commit';
    return;
  }

  var repoUrl = 'https://github.com/' + repo.name;

  var commitTitleElement = dom.select('#latest-commit .commit-title');
  commitTitleElement.href = repoUrl + '/commit/' + latestCommit.sha;
  commitTitleElement.textContent = latestCommit.message;

  var commitDateElement = dom.select('#latest-commit .commit-date');
  commitDateElement.setAttribute('datetime', createdAt);
  commitDateElement.textContent = jQuery.timeago(createdAt);

  var repoTitleElement = dom.select('#latest-commit .repo-title');
  repoTitleElement.href = repoUrl;
  repoTitleElement.textContent = repo.name.replace(new RegExp('^' + username + '/'), '');
})($);

},{}],3:[function(require,module,exports){
'use strict';

(async function () {
  var dom = {
    select: document.querySelector.bind(document)
  };

  var container = dom.select('#latest-repos-items');
  var placeholderTemplate = dom.select('#latest-repo-placeholder').content;
  var template = dom.select('#latest-repos-template').content;

  var placeholder = placeholderTemplate.cloneNode(true);
  for (var i = 0; i < 6; i += 1) {
    container.appendChild(document.importNode(placeholder, true));
  }

  try {
    var response = await $.getJSON({ url: 'https://gh-latest-repos-fmyaneprcd.now.sh' });
    var repos = response.reverse().filter(function (repo) {
      return Boolean(repo.description);
    });

    container.innerHTML = '';

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = repos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var repo = _step.value;

        var content = template.cloneNode(true);

        content.querySelector('.latest-repos-title').textContent = repo.name;
        content.querySelector('.latest-repos-description').textContent = repo.description;

        var link = content.querySelector('.latest-repos-link');
        link.title = repo.name + ' on GitHub';
        link.href = repo.url;

        container.appendChild(document.importNode(content, true));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } catch (error) {
    console.warn('Error loading contributions section', error);
    dom.select('#projects').classList.add('hidden');
    dom.select('#primary-nav li[data-magellan-arrival="projects"]').classList.add('hidden');
  }
})();

},{}],4:[function(require,module,exports){
'use strict';

(function () {
  /**
   * Cache of commonly-accessed navigation objects.
   * @type {Object}
   */
  var element = {
    /** @type {jQuery} Navigation component container. */
    $primaryNav: $('#primary-nav')
  };

  /**
   * Fadable header
   *
   * On large screens: hides the header initially
   * and then fades it after scrolling.
   */
  var fadableHeader = function fadableHeader() {
    var $primaryNav = element.$primaryNav;


    $primaryNav.removeClass('sticky');

    $(document).on('scroll', function () {
      if ($(document).width() > 640) {
        if ($(document).scrollTop() > 420) {
          $primaryNav.addClass('sticky fixed');
        } else {
          $primaryNav.removeClass('sticky fixed');
          $('body').removeClass('f-topbar-fixed');
        }
      }
    });
  };

  $.scrollUp();
  fadableHeader();
})();

},{}],5:[function(require,module,exports){
'use strict';

(async function () {
  var dom = {
    select: document.querySelector.bind(document)
  };

  var template = dom.select('#quote-template').content;
  var container = dom.select('#quote-container');

  try {
    var _ref = await $.getJSON({
      url: 'https://cdn.rawgit.com/chrisvogt/49b51791348a09cbddb0/raw/585d1712885dda5c13d63c17b5e093d543640e42/book-quotes.json'
    }),
        quotes = _ref.quotes;

    var fragment = document.createDocumentFragment();

    if (!quotes || quotes.length === 0) {
      throw new Error('No quotes found.');
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = quotes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var quote = _step.value;
        var cite = quote.cite,
            text = quote.text;

        var content = template.cloneNode(true);
        var blockquote = content.querySelector('.quote-content');

        var citeEl = document.createElement('cite');
        citeEl.appendChild(document.createTextNode(cite));

        blockquote.appendChild(document.createTextNode(text));
        blockquote.appendChild(citeEl);

        fragment.appendChild(content);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    container.appendChild(document.importNode(fragment, true));
  } catch (error) {
    console.warn('Error loading quotes section', error);
  }
})();

},{}],6:[function(require,module,exports){
'use strict';

(async function () {
  var dom = {
    select: document.querySelector.bind(document)
  };

  var container = dom.select('#recently-read');
  var bookList = dom.select('#recent-books');
  var navButton = dom.select('#primary-nav li[data-magellan-arrival="recently-read"]');
  var template = dom.select('#recent-book-template').content;

  try {
    var books = await $.getJSON({ url: 'https://recently-read.chrisvogt.me' });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = books.slice(0, 9)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var book = _step.value;

        var content = template.cloneNode(true);

        var link = content.querySelector('.recent-book-link');
        link.title = book.title + ' on Google Books';
        link.href = book.infoLink;

        var image = content.querySelector('.recent-book-image');
        image.src = book.smallThumbnail;
        image.alt = book.title;

        bookList.appendChild(document.importNode(content, true));
        [container, navButton].forEach(function (el) {
          return el.classList.remove('hidden');
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } catch (error) {
    console.warn('Error loading recently read section', error);
  }
})();

},{}],7:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(async function () {
  var dom = {
    select: document.querySelector.bind(document)
  };

  var template = dom.select('#social-item-template').content;
  var container = dom.select('#social-profiles');

  try {
    var profiles = await $.getJSON({ url: 'https://chrisvogt.firebaseio.com/v1/profiles.json' });

    if (!profiles || profiles.length === 0) {
      throw new Error('No profiles found.');
    }

    var fragment = document.createDocumentFragment();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = profiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _content$querySelecto;

        var profile = _step.value;

        var content = template.cloneNode(true);
        var href = profile.href,
            icon = profile.icon,
            name = profile.name;


        var iconCss = icon.split(' ');
        (_content$querySelecto = content.querySelector('.social-item-icon').classList).add.apply(_content$querySelecto, _toConsumableArray(iconCss));

        var link = content.querySelector('.social-item-link');
        link.title = 'Chris Vogt on ' + name;
        link.href = href;

        fragment.appendChild(document.importNode(content, true));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    container.innerHTML = '';
    container.appendChild(document.importNode(fragment, true));
  } catch (error) {
    console.warn('Error loading social profiles section', error);
    dom.select('#social').classList.add('hidden');
  }
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfaW5jbHVkZXMvanMvYXBwLmpzIiwiX2luY2x1ZGVzL2pzL2xhdGVzdC1jb21taXQuanMiLCJfaW5jbHVkZXMvanMvbGF0ZXN0LXJlcG9zLmpzIiwiX2luY2x1ZGVzL2pzL25hdmlnYXRpb24uanMiLCJfaW5jbHVkZXMvanMvcXVvdGVzLmpzIiwiX2luY2x1ZGVzL2pzL3JlY2VudGx5LXJlYWQuanMiLCJfaW5jbHVkZXMvanMvc29jaWFsLXByb2ZpbGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLENBQUMsWUFBTTtBQUNMLElBQUUsUUFBRixFQUFZLFVBQVo7O0FBRUE7Ozs7O0FBS0EsU0FBTyxLQUFQLEdBQWdCLFVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsRUFBaEIsRUFBb0I7QUFDbEMsUUFBTSxJQUFJLE9BQU8sS0FBUCxJQUFnQixFQUExQjs7QUFFQSxRQUFJLEVBQUUsY0FBRixDQUFpQixFQUFqQixDQUFKLEVBQTBCO0FBQ3hCLGFBQU8sQ0FBUDtBQUNEOztBQUVELFFBQUksS0FBSyxFQUFFLG9CQUFGLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBQVQ7QUFDQSxTQUFLLEVBQUUsYUFBRixDQUFnQixDQUFoQixDQUFMO0FBQ0EsT0FBRyxFQUFILEdBQVEsRUFBUjtBQUNBLE9BQUcsR0FBSCxHQUFTLHlDQUFUOztBQUVBLFFBQU0sTUFBTSxFQUFFLG9CQUFGLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBQVo7QUFDQSxRQUFJLFVBQUosQ0FBZSxZQUFmLENBQTRCLEVBQTVCLEVBQWdDLEdBQWhDOztBQUVBLE1BQUUsRUFBRixHQUFPLEVBQVA7QUFDQSxNQUFFLEtBQUYsR0FBVSxVQUFVLENBQVYsRUFBYTtBQUNyQixRQUFFLEVBQUYsQ0FBSyxJQUFMLENB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Qjs7O0FBUTlCLFlBQU0sVUFBVSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWhCO0FBQ0EseUNBQVEsYUFBUixDQUFzQixtQkFBdEIsRUFBMkMsU0FBM0MsRUFBcUQsR0FBckQsaURBQTRELE9BQTVEOztBQUVBLFlBQU0sT0FBTyxRQUFRLGFBQVIsQ0FBc0IsbUJBQXRCLENBQWI7QUFDQSxhQUFLLEtBQUwsc0JBQThCLElBQTlCO0FBQ0EsYUFBSyxJQUFMLEdBQVksSUFBWjs7QUFFQSxpQkFBUyxXQUFULENBQXFCLFNBQVMsVUFBVCxDQUFvQixPQUFwQixFQUE2QixJQUE3QixDQUFyQjtBQUNEO0FBeEJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBMEJGLGNBQVUsU0FBVixHQUFzQixFQUF0QjtBQUNBLGNBQVUsV0FBVixDQUFzQixTQUFTLFVBQVQsQ0FBb0IsUUFBcEIsRUFBOEIsSUFBOUIsQ0FBdEI7QUFDRCxHQTVCRCxDQTRCRSxPQUFPLEtBQVAsRUFBYztBQUNkLFlBQVEsSUFBUixDQUFhLHVDQUFiLEVBQXNELEtBQXREO0FBQ0EsUUFBSSxNQUFKLENBQVcsU0FBWCxFQUFzQixTQUF0QixDQUFnQyxHQUFoQyxDQUFvQyxRQUFwQztBQUNEO0FBQ0YsQ0F4Q0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgbGF0ZXN0Q29tbWl0IGZyb20gJy4vbGF0ZXN0LWNvbW1pdCc7XG5pbXBvcnQgbGF0ZXN0UmVwb3MgZnJvbSAnLi9sYXRlc3QtcmVwb3MnO1xuaW1wb3J0IG5hdmlnYXRpb24gZnJvbSAnLi9uYXZpZ2F0aW9uJztcbmltcG9ydCBxdW90ZXMgZnJvbSAnLi9xdW90ZXMnO1xuaW1wb3J0IHJlY2VudGx5UmVhZCBmcm9tICcuL3JlY2VudGx5LXJlYWQnO1xuaW1wb3J0IHNvY2lhbFByb2ZpbGVzIGZyb20gJy4vc29jaWFsLXByb2ZpbGVzJztcblxuKCgpID0+IHtcbiAgJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xuXG4gIC8qKlxuICAgKiBUd2l0dGVyIEFQSVxuICAgKlxuICAgKiBAbGluayBodHRwczovL2Rldi50d2l0dGVyLmNvbS9vdmVydmlldy9kb2N1bWVudGF0aW9uXG4gICAqL1xuICB3aW5kb3cudHd0dHIgPSAoZnVuY3Rpb24gKGQsIHMsIGlkKSB7XG4gICAgY29uc3QgdCA9IHdpbmRvdy50d3R0ciB8fCB7fTtcblxuICAgIGlmIChkLmdldEVsZW1lbnRCeUlkKGlkKSkge1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfVxuXG4gICAgbGV0IGpzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXTtcbiAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTtcbiAgICBqcy5pZCA9IGlkO1xuICAgIGpzLnNyYyA9ICdodHRwczovL3BsYXRmb3JtLnR3aXR0ZXIuY29tL3dpZGdldHMuanMnO1xuXG4gICAgY29uc3QgZmpzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXTtcbiAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XG5cbiAgICB0Ll9lID0gW107XG4gICAgdC5yZWFkeSA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICB0Ll9lLnB1c2goZik7XG4gICAgfTtcblxuICAgIHJldHVybiB0O1xuICB9KShkb2N1bWVudCwgJ3NjcmlwdCcsICd0d2l0dGVyLXdqcycpO1xuXG4gICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oe1xuICAgICdtYWdlbGxhbi1leHBlZGl0aW9uJzoge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgICBhY3RpdmVfY2xhc3M6ICdhY3RpdmUnLFxuICAgICAgdGhyZXNob2xkOiBmYWxzZSxcbiAgICAgIGRlc3RpbmF0aW9uX3RocmVzaG9sZDogMjAsXG4gICAgICB0aHJvdHRsZV9kZWxheTogNTAsXG4gICAgICBmaXhlZF90b3A6IDAsXG4gICAgICBvZmZzZXRfYnlfaGVpZ2h0OiB0cnVlXG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIEluc3RhZ3JhbSB2aWEgaW5zdGFmZWVkLmpzXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vaW5zdGFmZWVkanMuY29tL1xuICAgKi9cbiAgY29uc3QgdXNlckZlZWQgPSBuZXcgSW5zdGFmZWVkKHtcbiAgICBnZXQ6ICd1c2VyJyxcbiAgICB1c2VySWQ6ICcxNTQ2NDIxMTI3JyxcbiAgICBjbGllbnRJZDogJzdlMDdmY2Y3ODNlNzQ2YjNhMjM2MzQxMDQ5ZmEzY2MwJyxcbiAgICBhY2Nlc3NUb2tlbjogJzE1NDY0MjExMjcuMTY3N2VkMC4zNjIwNzhhMGQzN2E0ZmNiOGJjYmY1MjBhNDQ1OWNkZCcsXG4gICAgc29ydEJ5OiAnbW9zdC1yZWNlbnQnLFxuICAgIGxpbWl0OiAxOCxcbiAgICB0ZW1wbGF0ZTogJzxsaT48YSBocmVmPVwie3tsaW5rfX1cIiBjbGFzcz1cImh2ci1zaGFkb3ctcmFkaWFsXCIgdGl0bGU9XCJWaWV3IG9uIEluc3RhZ3JhbVwiPjxpbWcgc3JjPVwie3tpbWFnZX19XCIgYWx0PVwie3tjYXB0aW9ufX1cIj48L2E+PC9saT4nLFxuICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICQoJyNwaG90b3MnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAkKCcjcGhvdG9zIC5qcy1sb2FkLW1vcmUnKS5jbGljaygoKSA9PiB7XG4gICAgICAgIGlmIChmZWVkICYmIHR5cGVvZiBmZWVkLm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBmZWVkLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcjogZXJyID0+IHtcbiAgICAgIGNvbnNvbGUud2FybignRXJyb3IgbG9hZGluZyBJbnN0YWdyYW0gcGhvdG9zJywgZXJyKTtcbiAgICAgICQoJyNwcmltYXJ5LW5hdiBhW2hyZWY9XCIjcGhvdG9zXCJdJykucGFyZW50KCdsaScpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gIH0pO1xuICB1c2VyRmVlZC5ydW4oKTtcbiAgd2luZG93LmZlZWQgPSB1c2VyRmVlZDtcbn0pKCk7XG4iLCIoYXN5bmMgalF1ZXJ5ID0+IHtcbiAgY29uc3QgZG9tID0ge1xuICAgIHNlbGVjdDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxuICB9O1xuXG4gIGNvbnN0IHVzZXJuYW1lID0gJ2Nocmlzdm9ndCc7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgJC5nZXRKU09OKHt1cmw6IGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7dXNlcm5hbWV9L2V2ZW50cy9wdWJsaWNgfSk7XG5cbiAgY29uc3QgbGF0ZXN0UHVzaEV2ZW50ID0gcmVzcG9uc2UuZmluZChldmVudCA9PiBldmVudC50eXBlID09PSAnUHVzaEV2ZW50Jyk7XG4gIGNvbnN0IHtyZXBvLCBwYXlsb2FkLCBjcmVhdGVkX2F0OiBjcmVhdGVkQXR9ID0gbGF0ZXN0UHVzaEV2ZW50O1xuXG4gIGNvbnN0IGxhdGVzdENvbW1pdCA9IHBheWxvYWQuY29tbWl0cy5yZXZlcnNlKClbMF07XG4gIGlmICghbGF0ZXN0Q29tbWl0KSB7XG4gICAgZG9tLnNlbGVjdCgnI2xhdGVzdC1jb21taXQnKS50ZXh0Q29udGVudCA9ICdObyBjb21taXQnO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlcG9VcmwgPSBgaHR0cHM6Ly9naXRodWIuY29tLyR7cmVwby5uYW1lfWA7XG5cbiAgY29uc3QgY29tbWl0VGl0bGVFbGVtZW50ID0gZG9tLnNlbGVjdCgnI2xhdGVzdC1jb21taXQgLmNvbW1pdC10aXRsZScpO1xuICBjb21taXRUaXRsZUVsZW1lbnQuaHJlZiA9IGAke3JlcG9Vcmx9L2NvbW1pdC8ke2xhdGVzdENvbW1pdC5zaGF9YDtcbiAgY29tbWl0VGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gbGF0ZXN0Q29tbWl0Lm1lc3NhZ2U7XG5cbiAgY29uc3QgY29tbWl0RGF0ZUVsZW1lbnQgPSBkb20uc2VsZWN0KCcjbGF0ZXN0LWNvbW1pdCAuY29tbWl0LWRhdGUnKTtcbiAgY29tbWl0RGF0ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRldGltZScsIGNyZWF0ZWRBdCk7XG4gIGNvbW1pdERhdGVFbGVtZW50LnRleHRDb250ZW50ID0galF1ZXJ5LnRpbWVhZ28oY3JlYXRlZEF0KTtcblxuICBjb25zdCByZXBvVGl0bGVFbGVtZW50ID0gZG9tLnNlbGVjdCgnI2xhdGVzdC1jb21taXQgLnJlcG8tdGl0bGUnKTtcbiAgcmVwb1RpdGxlRWxlbWVudC5ocmVmID0gcmVwb1VybDtcbiAgcmVwb1RpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IHJlcG8ubmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3VzZXJuYW1lfS9gKSwgJycpO1xufSkoJCk7XG4iLCIoYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkb20gPSB7XG4gICAgc2VsZWN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXG4gIH07XG5cbiAgY29uc3QgY29udGFpbmVyID0gZG9tLnNlbGVjdCgnI2xhdGVzdC1yZXBvcy1pdGVtcycpO1xuICBjb25zdCBwbGFjZWhvbGRlclRlbXBsYXRlID0gZG9tLnNlbGVjdCgnI2xhdGVzdC1yZXBvLXBsYWNlaG9sZGVyJykuY29udGVudDtcbiAgY29uc3QgdGVtcGxhdGUgPSBkb20uc2VsZWN0KCcjbGF0ZXN0LXJlcG9zLXRlbXBsYXRlJykuY29udGVudDtcblxuICBjb25zdCBwbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkgKz0gMSkge1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5pbXBvcnROb2RlKHBsYWNlaG9sZGVyLCB0cnVlKSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgJC5nZXRKU09OKHt1cmw6ICdodHRwczovL2doLWxhdGVzdC1yZXBvcy1mbXlhbmVwcmNkLm5vdy5zaCd9KTtcbiAgICBjb25zdCByZXBvcyA9IHJlc3BvbnNlLnJldmVyc2UoKS5maWx0ZXIocmVwbyA9PiBCb29sZWFuKHJlcG8uZGVzY3JpcHRpb24pKTtcblxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvciAoY29uc3QgcmVwbyBvZiByZXBvcykge1xuICAgICAgY29uc3QgY29udGVudCA9IHRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgY29udGVudC5xdWVyeVNlbGVjdG9yKCcubGF0ZXN0LXJlcG9zLXRpdGxlJykudGV4dENvbnRlbnQgPSByZXBvLm5hbWU7XG4gICAgICBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYXRlc3QtcmVwb3MtZGVzY3JpcHRpb24nKS50ZXh0Q29udGVudCA9IHJlcG8uZGVzY3JpcHRpb247XG5cbiAgICAgIGNvbnN0IGxpbmsgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYXRlc3QtcmVwb3MtbGluaycpO1xuICAgICAgbGluay50aXRsZSA9IGAke3JlcG8ubmFtZX0gb24gR2l0SHViYDtcbiAgICAgIGxpbmsuaHJlZiA9IHJlcG8udXJsO1xuXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wb3J0Tm9kZShjb250ZW50LCB0cnVlKSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUud2FybignRXJyb3IgbG9hZGluZyBjb250cmlidXRpb25zIHNlY3Rpb24nLCBlcnJvcik7XG4gICAgZG9tLnNlbGVjdCgnI3Byb2plY3RzJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgZG9tLnNlbGVjdCgnI3ByaW1hcnktbmF2IGxpW2RhdGEtbWFnZWxsYW4tYXJyaXZhbD1cInByb2plY3RzXCJdJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIH1cbn0pKCk7XG4iLCIoKCkgPT4ge1xuICAvKipcbiAgICogQ2FjaGUgb2YgY29tbW9ubHktYWNjZXNzZWQgbmF2aWdhdGlvbiBvYmplY3RzLlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgY29uc3QgZWxlbWVudCA9IHtcbiAgICAvKiogQHR5cGUge2pRdWVyeX0gTmF2aWdhdGlvbiBjb21wb25lbnQgY29udGFpbmVyLiAqL1xuICAgICRwcmltYXJ5TmF2OiAkKCcjcHJpbWFyeS1uYXYnKVxuICB9O1xuXG4gIC8qKlxuICAgKiBGYWRhYmxlIGhlYWRlclxuICAgKlxuICAgKiBPbiBsYXJnZSBzY3JlZW5zOiBoaWRlcyB0aGUgaGVhZGVyIGluaXRpYWxseVxuICAgKiBhbmQgdGhlbiBmYWRlcyBpdCBhZnRlciBzY3JvbGxpbmcuXG4gICAqL1xuICBjb25zdCBmYWRhYmxlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgICRwcmltYXJ5TmF2XG4gICAgfSA9IGVsZW1lbnQ7XG5cbiAgICAkcHJpbWFyeU5hdi5yZW1vdmVDbGFzcygnc3RpY2t5Jyk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgaWYgKCQoZG9jdW1lbnQpLndpZHRoKCkgPiA2NDApIHtcbiAgICAgICAgaWYgKCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpID4gNDIwKSB7XG4gICAgICAgICAgJHByaW1hcnlOYXYuYWRkQ2xhc3MoJ3N0aWNreSBmaXhlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRwcmltYXJ5TmF2LnJlbW92ZUNsYXNzKCdzdGlja3kgZml4ZWQnKTtcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAkLnNjcm9sbFVwKCk7XG4gIGZhZGFibGVIZWFkZXIoKTtcbn0pKCk7XG4iLCIoYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkb20gPSB7XG4gICAgc2VsZWN0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpXG4gIH07XG5cbiAgY29uc3QgdGVtcGxhdGUgPSBkb20uc2VsZWN0KCcjcXVvdGUtdGVtcGxhdGUnKS5jb250ZW50O1xuICBjb25zdCBjb250YWluZXIgPSBkb20uc2VsZWN0KCcjcXVvdGUtY29udGFpbmVyJyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7cXVvdGVzfSA9IGF3YWl0ICQuZ2V0SlNPTih7XG4gICAgICB1cmw6ICdodHRwczovL2Nkbi5yYXdnaXQuY29tL2Nocmlzdm9ndC80OWI1MTc5MTM0OGEwOWNiZGRiMC9yYXcvNTg1ZDE3MTI4ODVkZGE1YzEzZDYzYzE3YjVlMDkzZDU0MzY0MGU0Mi9ib29rLXF1b3Rlcy5qc29uJ1xuICAgIH0pO1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgaWYgKCFxdW90ZXMgfHwgcXVvdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBxdW90ZXMgZm91bmQuJyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBxdW90ZSBvZiBxdW90ZXMpIHtcbiAgICAgIGNvbnN0IHtjaXRlLCB0ZXh0fSA9IHF1b3RlO1xuICAgICAgY29uc3QgY29udGVudCA9IHRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIGNvbnN0IGJsb2NrcXVvdGUgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdW90ZS1jb250ZW50Jyk7XG5cbiAgICAgIGNvbnN0IGNpdGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NpdGUnKTtcbiAgICAgIGNpdGVFbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaXRlKSk7XG5cbiAgICAgIGJsb2NrcXVvdGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xuICAgICAgYmxvY2txdW90ZS5hcHBlbmRDaGlsZChjaXRlRWwpO1xuXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB9XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wb3J0Tm9kZShmcmFnbWVudCwgdHJ1ZSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUud2FybignRXJyb3IgbG9hZGluZyBxdW90ZXMgc2VjdGlvbicsIGVycm9yKTtcbiAgfVxufSkoKTtcbiIsIihhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGRvbSA9IHtcbiAgICBzZWxlY3Q6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudClcbiAgfTtcblxuICBjb25zdCBjb250YWluZXIgPSBkb20uc2VsZWN0KCcjcmVjZW50bHktcmVhZCcpO1xuICBjb25zdCBib29rTGlzdCA9IGRvbS5zZWxlY3QoJyNyZWNlbnQtYm9va3MnKTtcbiAgY29uc3QgbmF2QnV0dG9uID0gZG9tLnNlbGVjdCgnI3ByaW1hcnktbmF2IGxpW2RhdGEtbWFnZWxsYW4tYXJyaXZhbD1cInJlY2VudGx5LXJlYWRcIl0nKTtcbiAgY29uc3QgdGVtcGxhdGUgPSBkb20uc2VsZWN0KCcjcmVjZW50LWJvb2stdGVtcGxhdGUnKS5jb250ZW50O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgYm9va3MgPSBhd2FpdCAkLmdldEpTT04oe3VybDogJ2h0dHBzOi8vcmVjZW50bHktcmVhZC5jaHJpc3ZvZ3QubWUnfSk7XG4gICAgZm9yIChjb25zdCBib29rIG9mIGJvb2tzLnNsaWNlKDAsIDkpKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICBjb25zdCBsaW5rID0gY29udGVudC5xdWVyeVNlbGVjdG9yKCcucmVjZW50LWJvb2stbGluaycpO1xuICAgICAgbGluay50aXRsZSA9IGAke2Jvb2sudGl0bGV9IG9uIEdvb2dsZSBCb29rc2A7XG4gICAgICBsaW5rLmhyZWYgPSBib29rLmluZm9MaW5rO1xuXG4gICAgICBjb25zdCBpbWFnZSA9IGNvbnRlbnQucXVlcnlTZWxlY3RvcignLnJlY2VudC1ib29rLWltYWdlJyk7XG4gICAgICBpbWFnZS5zcmMgPSBib29rLnNtYWxsVGh1bWJuYWlsO1xuICAgICAgaW1hZ2UuYWx0ID0gYm9vay50aXRsZTtcblxuICAgICAgYm9va0xpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wb3J0Tm9kZShjb250ZW50LCB0cnVlKSk7XG4gICAgICBbY29udGFpbmVyLCBuYXZCdXR0b25dLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGxvYWRpbmcgcmVjZW50bHkgcmVhZCBzZWN0aW9uJywgZXJyb3IpO1xuICB9XG59KSgpO1xuIiwiKGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9tID0ge1xuICAgIHNlbGVjdDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxuICB9O1xuXG4gIGNvbnN0IHRlbXBsYXRlID0gZG9tLnNlbGVjdCgnI3NvY2lhbC1pdGVtLXRlbXBsYXRlJykuY29udGVudDtcbiAgY29uc3QgY29udGFpbmVyID0gZG9tLnNlbGVjdCgnI3NvY2lhbC1wcm9maWxlcycpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcHJvZmlsZXMgPSBhd2FpdCAkLmdldEpTT04oe3VybDogJ2h0dHBzOi8vY2hyaXN2b2d0LmZpcmViYXNlaW8uY29tL3YxL3Byb2ZpbGVzLmpzb24nfSk7XG5cbiAgICBpZiAoIXByb2ZpbGVzIHx8IHByb2ZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBwcm9maWxlcyBmb3VuZC4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBmb3IgKGNvbnN0IHByb2ZpbGUgb2YgcHJvZmlsZXMpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0ZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGhyZWYsXG4gICAgICAgIGljb24sXG4gICAgICAgIG5hbWVcbiAgICAgIH0gPSBwcm9maWxlO1xuXG4gICAgICBjb25zdCBpY29uQ3NzID0gaWNvbi5zcGxpdCgnICcpO1xuICAgICAgY29udGVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsLWl0ZW0taWNvbicpLmNsYXNzTGlzdC5hZGQoLi4uaWNvbkNzcyk7XG5cbiAgICAgIGNvbnN0IGxpbmsgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWwtaXRlbS1saW5rJyk7XG4gICAgICBsaW5rLnRpdGxlID0gYENocmlzIFZvZ3Qgb24gJHtuYW1lfWA7XG4gICAgICBsaW5rLmhyZWYgPSBocmVmO1xuXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5pbXBvcnROb2RlKGNvbnRlbnQsIHRydWUpKTtcbiAgICB9XG5cbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmltcG9ydE5vZGUoZnJhZ21lbnQsIHRydWUpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLndhcm4oJ0Vycm9yIGxvYWRpbmcgc29jaWFsIHByb2ZpbGVzIHNlY3Rpb24nLCBlcnJvcik7XG4gICAgZG9tLnNlbGVjdCgnI3NvY2lhbCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICB9XG59KSgpO1xuIl19
