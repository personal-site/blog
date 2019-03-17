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
through while working on my personal site.

### How this project came to be

When this website was first published, _circa_ 2012, it was an aggregation of social
posts and links to projects I was working on. That first version of the site was
a self-hosted WordPress website using a custom theme and a mix of paid and free
plugins.

Since then, this website has become a digital sandbox where I explore and test various
tools, technology, and designs. Since its inception 7 years ago, this personal site
has run on WordPress, then CakePHP, then Jekyll with jQuery, and finally Node with
jQuery and HTML that was eventually wrapped, yet again, by Jekyll.

Here is a diagram showing how requests for data currently currently flow for this site.

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

I have many ideas for the front end of this site, like replacing the unmaintained
Foundation 5 front end framework with something modern, decoupling the JavaScript
from the blog code so it can be maintained separately and imported into other
projects, and features to showcase and share creative projects. To get there, I
should first polish the back end.

Here is a rough diagram showing how I plan to normalize the data flow.

![Proposed data diagram, chrisvogt.me](/assets/images/posts/data-diagram-proposed.svg)

My plan calls for the following components.

* *Personal Site* – blog engine and client.
* *Personal API* – API for my personal data and metrics.
* *Job Scheduler* – job scheduler for internal tasks.
* *Entities* – data abstraction layer for fetch and save operations.

The main items I'm addresing are:

* Reducing the number of calls made by the client to render the site. The Personal
API can have an endpoint that returns all data necessary to render the page.
* Adds a new service for scheduling jobs to fetch and cache social feeds.
* Moves data operations into an abstraction layer to decouple fetch and CRUD
operations from the API core.

It should then be possible for each component to provide hooks and events plugins
can use to extend the Personal API in a modular and customizable way.
