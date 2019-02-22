# Personal Blog Jekyll Theme

[![Build status](https://img.shields.io/travis/personal-site/blog.svg?branch=master&style=flat-square)](https://travis-ci.org/personal-site/blog)
[![Code Climate](https://codeclimate.com/github/personal-site/blog/badges/gpa.svg)](https://codeclimate.com/github/personal-site/blog)
[![GitHub release](https://img.shields.io/github/release/personal-site/blog.svg?style=flat-square)](https://github.com/personal-site/blog/releases)
[![David.io Dev Dependencies](https://david-dm.org/personal-site/blog/dev-status.svg?style=flat-square)](https://david-dm.org/personal-site/blog?type=dev)
[![GitHub license](https://img.shields.io/github/license/personal-site/blog.svg?style=flat-square)](https://github.com/personal-site/blog/blob/master/LICENSE)

This is the code behind [www.chrisvogt.me](https://www.chrisvogt.me), a personal blog with built-in Instagram, GitHub and Goodreads widgets. This project is a hobby project that is not easily customizable currently, but by [the v1.0.0 milestone](https://github.com/personal-site/blog/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22v1.0.0+%E2%80%94+first+stable+release%22) it should be simple to setup a custimozable instance.

## How to use

### Setup components

Many of the components depend on external data. This table shows the components, the project code I'm using for the demonstration site above and example response data.

| Component      | Project                                                               | Example Response                                         |
|----------------|-----------------------------------------------------------------------|----------------------------------------------------------|
| Latest Commit  | _Built in_                                                            | [_schema/latest-commit.json](_schema/latest-commit.json) |
| Latest Repos   | _Built in_                                                            | [_schema/latest-repos.json](_schema/latest-repos.json)   |
| Navigation     | _Built in_                                                            | [_data/navigation.json](_data/navigation.json)           |
| Posts          | _Built in_                                                            | [_posts/hello-world.md](_posts/hello-world.md)
| Profiles       | [personal-api/core](https://github.com/personal-api/core)             | [_schema/profiles.json](_schema/profiles.json)           |
| Quotes         | [personal-api/core](https://github.com/personal-api/core)             | [_schema/quotes.json](_schema/quotes.json)               |
| Recently Read  | [chrisvogt/recently-read](https://github.com/chrisvogt/recently-read) | [_schema/recently-read.json](_schema/recently-read.json) |

### Install dependencies

```
gem install bundler && npm install
```

### Develop

```
npm run start
```

### Build

```
npm run build
```

Build outputs to the `_/build` directory.

### Deploy

I manually deploy this to a `gh-pages` branch in [chrisvogt/www.chrisvogt.me](https://github.com/chrisvogt/www.chrisvogt.me).

## License

[MIT](LICENSE) © [Chris Vogt](https://www.chrisvogt.me).
