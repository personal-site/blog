(async () => {
  const dom = {
    select: document.querySelector.bind(document)
  };

  const template = dom.select('#latest-repos-template').content;
  const container = dom.select('#latest-repos');

  try {
    const response = await $.getJSON({ url: `https://gh-latest-repos-fmyaneprcd.now.sh/` });
    const repos = response.reverse().filter(repo => !!repo.description);

    for (const repo of repos) {
      const content = template.cloneNode(true);

      content.querySelector('.latest-repos-title').textContent = repo.name;
      content.querySelector('.latest-repos-description').textContent = repo.description;

      const link = content.querySelector('.latest-repos-link');
      link.title = `${repo.name} on GitHub`;
      link.href = repo.url;

      container.appendChild(document.importNode(content, true));
    }
  } catch (error) {
    console.warn('Error loading contributions section', error);
    dom.select('#projects').classList.add('hidden');
    dom.select('#primary-nav li[data-magellan-arrival="projects"]').classList.add('hidden');
  }
})();
