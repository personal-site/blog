---
title: "Overview: My Personal Site & Blog"
categories: [meta]
slug: site-architecture
tags: [meta, open source, JavaScript]
excerpt: >
  My website is currently made up of a collection of microservices
  and APIs. This article documents those projects and provides an
  overview for my website's architecture and future plans.
---

<span class="text-drop-cap">I</span>'m going to write about how my site currently
works and share thoughts on the direction I plan on taking it. This is the first
in a series of posts tagged `meta` where I'll write about issues I'm working
through while building my personal site.

### How this project came to exist

When this website was first published _circa_ 2012, it was an aggregation of social
posts and links to projects I was working on. My intention was to have a space online where I could fully customize the design and user experience. That first version of
the site was a self-hosted WordPress website using a custom theme and a mix of paid
and free plugins.

Since then, this website has become a digital sandbox where I explore and test various
tools, technology, and designs. Since its inception 7 years ago, this personal site
has run on WordPress, then CakePHP, then Jekyll with jQuery, and finally Node with
jQuery and HTML that was eventually wrapped, yet again, by Jekyll.

Here is a diagram showing how requests for data currently flows behind this site.

![Data diagram, chrisvogt.me](/assets/images/posts/data-diagram-0316.svg)

All of the components and services are open source projects available on GitHub.

| Component      | Project                                                                           |
|----------------|-----------------------------------------------------------------------------------|
| Blog Engine    | [personal-site/blog](https://github.com/personal-site/blog)                       |
| Personal API   | [personal-api/core](https://github.com/personal-api/core) 
| Instagram Feed | [personal-api/plugin-instagram](https://github.com/personal-api/plugin-instagram) |
| Latest Repos   | [sindresorhus/gh-latest-repos](https://github.com/sindresorhus/gh-latest-repos)   |                        |
| Recently Read  | [chrisvogt/recently-read](https://github.com/chrisvogt/recently-read)             |
| Stats          | [chrisvogt/stats](https://github.com/chrisvogt/stats)

### Where this project is going

This site will continue to serve as my blog journaling the things I create and
problems I work through and also as a showcase of my personal projects. In order
to iterate faster and focus on building cool features some cleanup needs to happen
aimed at making the architecture more consistent and stable.

Here is a rough diagram showing how I plan to normalize the data flow from above.

![Proposed data diagram, chrisvogt.me](/assets/images/posts/data-diagram-proposed.svg)

Starting at the top, the one-off stats "site" goes away and all content moves to
a new universal client, which for now will continue to be served by Jekyll. The
Personal API will be the primary interface for all data sources, whereas my current
setup from above has the client calling a mix of microservices, the Personal API,
and external APIs.

The Personal API will interact with data sources using a data abstraction layer,
referred to as _entities_, which will facilitate database CRUD operations and
abstract API interaction. Entities are a concept, and they can live within the
Personal API code.

* *Personal Site* – blog engine and client.
* *Personal API* – API for my personal data and metrics.
* *Job Scheduler* – job scheduler for internal tasks.
* *Entities* – data abstraction layer for API calls and database operations.

The main items I plan on addressing are:

* Reducing the number of network calls made by the client to render the site. The
current website makes 7 client-side calls to render the home page. When all data
is available through the Personal API, I will expose a route that returns all data
needed to render the page in one call.
* Reducing requests to external providers and gaining more control over my data by
making scheduled jobs to fetch and store data.
* Improving code convention and consistency by creating an abstraction layer for
interacting with data through entities, which will be like Models in MVC architecture.

As progress moves forward it can be tracked on the [@personal-site/blog GitHub Issues page](https://github.com/personal-site/blog/issues) and the [@personal-api/core GitHub Issues page](https://github.com/personal-api/core/issues). 
