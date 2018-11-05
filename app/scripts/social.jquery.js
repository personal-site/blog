(async () => {
  const dom = {
    select: document.querySelector.bind(document)
  };

  const template = dom.select('#social-item-template').content;
  const container = dom.select('#social-profiles');

  try {
    const profiles = await $.getJSON({ url: 'https://chrisvogt.firebaseio.com/v1/profiles.json' });
    const fragment = document.createDocumentFragment();

    for (const profile of profiles) {
      const content = template.cloneNode(true);

      const {
        href,
        icon,
        name
      } = profile;

      const iconCss = icon.split(' ');
      content.querySelector('.social-item-icon').classList.add(...iconCss);

      const link = content.querySelector('.social-item-link');
      link.title = `Chris Vogt on ${ name }`;
      link.href = href;

      fragment.appendChild(document.importNode(content, true));
    }

    container.innerHTML = '';
    container.appendChild(document.importNode(fragment, true));

  } catch (error) {
    console.warn('Error loading social profiles section', error);
    dom.select('#social').classList.add('hidden');
  }
})();
