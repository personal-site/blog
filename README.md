<img src="assets/images/h-logo.png" alt="www.chrisvogt.me" width="200" height="200">

[![Build status](https://img.shields.io/travis/personal-site/blog.svg?branch=master&style=flat-square)](https://travis-ci.org/personal-site/blog)
[![Code Climate](https://codeclimate.com/github/personal-site/blog/badges/gpa.svg)](https://codeclimate.com/github/personal-site/blog)
[![GitHub release](https://img.shields.io/github/release/personal-site/blog.svg?style=flat-square)](https://github.com/personal-site/blog/releases)
[![David.io Dev Dependencies](https://david-dm.org/personal-site/blog/dev-status.svg?style=flat-square)](https://david-dm.org/personal-site/blog?type=dev)
[![GitHub license](https://img.shields.io/github/license/personal-site/blog.svg?style=flat-square)](https://github.com/personal-site/blog/blob/master/LICENSE)

My personal website and blog, current a Jekyll + ES7 website deployed to GitHub Pages.

This is an open source project. I plan to make it fully customizable by [`v1.0.0`](https://github.com/personal-site/blog/milestone/1) so others can spin up their own sites using this template.

_View live at [www.chrisvogt.me](https://www.chrisvogt.me)._

### How to use

###### Setup components

The components expect data be available from HTTP endpoints that return data demonstrated in the _\_schema_ directory.

| Component | Example |
|---|---|
| Latest Commit | _\_schema/latest-commit.json_ |
| Latest Repos | _\_schema/latest-repos.json_ |
| Social Profiles | _\_schema/profiles.json_ |
| Quotes | _\_schema/quotes.json_ |
| Recently Read | _\_schema/quotes.json_ |

###### Install dependencies

* `gem install bundler && npm install`

###### Develop

* `npm run start`

###### Build

* `npm run build`

###### Deploy

Builds output to _/_build_. This currently must be manually deployed.

### License

[MIT](LICENSE) © [Chris Vogt](https://www.chrisvogt.me).

### Built with

<p align="left">
  <img src="https://bower.io/img/bower-logo.svg" alt="Bower.js" height="48" />
  <img src="https://avatars0.githubusercontent.com/u/1335026?v=3&s=200" alt="Firebase" height="48" />
  <img src="https://cdn.jsdelivr.net/gh/babel/logo/babel.png" alt="Babel" height="48" />
	<img src="https://upload.wikimedia.org/wikipedia/en/9/9e/JQuery_logo.svg" alt="jQuery" height="48" />
  <img src="https://cdn.rawgit.com/mathamoz/ionic-builder/898ac76dc9e9edeb02d1825358eca95ec742b985/public/images/why-the-yeti.svg" alt="Zurb Foundation" height="48" />
	<img src="https://upload.wikimedia.org/wikipedia/commons/1/10/CSS3_and_HTML5_logos_and_wordmarks.svg" alt="HTML5 &amp; CSS3" height="48" />
</p>
