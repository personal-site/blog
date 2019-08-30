export default async ({config, dom, jQuery}) => {
  const selectURL = config => {
    const {
      pinnedRepositories
    } = config;
    return pinnedRepositories;
  };
  const url = selectURL(config);

  if (!url) {
    console.warn('Unable to load the Pinned Repositories component without a config url.');
  }

  const container = dom.select('#pinned-repositories-items');
  const placeholderTemplate = dom.select('#pinned-repositories-placeholder').content;
  const template = dom.select('#pinned-repositories-template').content;

  const placeholder = placeholderTemplate.cloneNode(true);
  for (let i = 0; i < 6; i += 1) {
    container.append(document.importNode(placeholder, true));
  }

  try {
    const {getJSON} = jQuery;
    const {pinnedRepositories = []} = await getJSON({url});

    container.innerHTML = '';

    pinnedRepositories.forEach(repository => {
      const content = template.cloneNode(true);

      content.querySelector('.pinned-repositories-title').textContent = repository.nameWithOwner;
      content.querySelector('.pinned-repositories-description').textContent = repository.description;

      const link = content.querySelector('.pinned-repositories-link');
      link.title = `${repository.name} on GitHub`;
      link.href = repository.url;

      container.append(document.importNode(content, true));
    });
  } catch (error) {
    console.warn('Error loading contributions section', error);
    dom.select('#projects').classList.add('hidden');
  }
};
