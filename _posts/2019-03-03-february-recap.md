---
title:  My Personal Blog and Site's Architecture
categories: [meta]
slug: site-architecture
tags: [meta, open source, JavaScript]
excerpt: >
  My website is currently made up of a collection of microservices
  and APIs. This article documents those projects and provides an
  overview for my website's architecture and future plans.
---

> History of this site

<span class="text-drop-cap">W</span>hen I launched this site in 2012 it was a
collection of pages displaying aggregated events – Facebook posts, GitHub commits,
etc. – and links to demos and source code for projects I was working on. It was
built using a custom WordPress theme because I had been building marketing websites

Over the years, as I gained interest in or became familiar with other tools from
experience at work work, this website became my digital sandbox where could explore
different design, tech, and architecture at my own priority. Since then this website
has run on WordPress, CakePHP, Jekyll, custom Node and JavaScript build scripts,
and finally back to Jekyll again.

In 2015 I began to use WakaTime for tracking time spent editing code for projects.
That's how [stats.chrisvogt.me](https://stats.chrisvogt.me) was started, and it
has remained a separate CakePHP project with shockingly low maintenance needed to
keep it running. It just works.

By now most of those projects lay in the graveyard of archives found in my GitHub
account. What remains published is made up of a patchwork of different experiments
and personal projects that I've been tinkering on over the years. Here is a rough
diagram showing the data behind this site. 

![Data diagram, chrisvogt.me](/assets/images/posts/data-diagram-0314.svg)

> Data diagram for the current version of this site

The original WordPress version of this site was monolithic and contained neatly
within one project while the current iteration is spread across a hodge podge of
microservices, APIs, and Jekyll for the blog engine.

Every project for this site is available open source on GitHub although you would
need to make a significant amount of changes to customize everything. My projects
have a stable API and are considerate of backwards compatibility by version 1.0.0.

To mold this site into a more coherent, feature-rich project I will begin making
changes to both the front and the back end with goals of simplicity and performance.
I'm planning to keep Jekyll as the blog engine for the time being while focusing
on the server-side changes to iterate on the client once I've met those goals.

![Proposed data diagram, chrisvogt.me](/assets/images/posts/data-diagram-proposed.svg)

