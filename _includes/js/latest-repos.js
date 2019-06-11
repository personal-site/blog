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
    container.append(document.importNode(placeholder, true));
  }

  try {
    const {getJSON} = jQuery;
    const response = await getJSON({url});
    const repos = response.reverse().slice(0, 7).filter(repo => Boolean(repo.description));

    container.innerHTML = '';

    for (const [i, repo] of repos.entries()) {
      const content = template.cloneNode(true);

      content.querySelector('.latest-repos-title').textContent = repo.name;
      content.querySelector('.latest-repos-description').textContent = repo.description;

      const link = content.querySelector('.latest-repos-link');
      link.title = `${repo.name} on GitHub`;
      link.href = repo.url;

      container.append(document.importNode(content, true));
    }
  } catch (error) {
    console.warn('Error loading contributions section', error);
    dom.select('#projects').classList.add('hidden');
  }
};
