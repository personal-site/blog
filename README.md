# Personal Jekyll Blog

[![Build status](https://img.shields.io/travis/personal-site/blog.svg?branch=master&style=flat-square)](https://travis-ci.org/personal-site/blog)
[![Code Climate](https://codeclimate.com/github/personal-site/blog/badges/gpa.svg)](https://codeclimate.com/github/personal-site/blog)
[![GitHub release](https://img.shields.io/github/release/personal-site/blog.svg?style=flat-square)](https://github.com/personal-site/blog/releases)
[![David.io Dev Dependencies](https://david-dm.org/personal-site/blog/dev-status.svg?style=flat-square)](https://david-dm.org/personal-site/blog?type=dev)
[![GitHub license](https://img.shields.io/github/license/personal-site/blog.svg?style=flat-square)](https://github.com/personal-site/blog/blob/master/LICENSE)

This is the code behind [www.chrisvogt.me](https://www.chrisvogt.me), a personal blog with built-in Instagram, GitHub and Goodreads widgets.

## UI components

Many of the available UI components depend on external data. This table documents the available components and the projects behind the data sources I'm using for my website. Example data is available is provided for all components, defining the data and response structure expected by this project.


| Component      | Project                                                                                       | Example                                      |
|----------------|-----------------------------------------------------------------------------------------------|----------------------------------------------|
| Instagram      | [personal-api/plugin-instagram](https://github.com/personal-api/plugin-instagram) | [_schema/instagram.json](_schema/instagram.json)         |
| Latest Commit  | _Built in_                                                                        | [_schema/latest-commit.json](_schema/latest-commit.json) |
| Navigation     | _Built in_                                                                        | [_data/navigation.json](_data/navigation.json)           |
| Pinned Repositories   | _Built in_                                                                 | [_schema/pinned-repositories.json](_schema/pinned-repositories.json)   |
| Posts          | _Built in_                                                                        | [_posts/hello-world.md](_posts/2019-01-01-hello-world.md)           |
| Profiles       | [personal-api/core](https://github.com/personal-api/core)                         | [_schema/profiles.json](_schema/profiles.json)           |
| Quotes         | [personal-api/core](https://github.com/personal-api/core)                         | [_schema/quotes.json](_schema/quotes.json)               |
| Recently Read  | [chrisvogt/recently-read](https://github.com/chrisvogt/recently-read)             | [_schema/recently-read.json](_schema/recently-read.json) |

## How to use

### Requirements

| Tool    | Version | Link                      | Description                      |
|---------|---------|---------------------------|----------------------------------|
| Node    | 10       | https://nodejs.org        | Dev & build environment language |
| npm     | 6       | https://npmjs.com         | JavaScript dependency management |
| Ruby    | 2       | https://www.ruby-lang.org | Dev & build environment language |
| Bundler | >1.14   | https://bundler.io        | Ruby dependency management       |
| Jekyll  | 3       | https://jekyllrb.com      | Blog and template engine         |

### Configure

Copy `_config.yml` to `_config.prod.yml` and update with your options.

### Install dependencies

```
gem install bundler && npm install && npm run build
```

### Develop

```
npm run start
# Listens on http://127.0.0.1:4000
```

### Build

```
npm run build
```

The build process generates a static site that outputs to the `_/build` directory.

### Deploy

I manually deploy my site using [GitHub Pages](https://pages.github.com/) and the [chrisvogt/www.chrisvogt.me](https://github.com/chrisvogt/www.chrisvogt.me) repository.

## License

[MIT](LICENSE) © [Chris Vogt](https://www.chrisvogt.me).
