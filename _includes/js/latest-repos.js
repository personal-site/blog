export default async ({config, dom, jQuery}) => {
  const selectURL = config => {
    const {
      latestRepos
    } = config;
    return latestRepos;
  };

  const url = selectURL(config);

  if (!url) {
    console.warn('Unable to load the Latest Repos component without a config url.');
  }

  const container = dom.select('#latest-repos-items');
  const placeholderTemplate = dom.select('#latest-repo-placeholder').content;
  const template = dom.select('#latest-repos-template').content;

  const placeholder = placeholderTemplate.cloneNode(true);
  for (let i = 0; i < 6; i += 1) {
    container.appendChild(document.importNode(placeholder, true));
  }

  try {
    const {getJSON} = jQuery;
    const response = await getJSON({url});
    const repos = response.reverse().filter(repo => Boolean(repo.description));

    container.innerHTML = '';

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
};
