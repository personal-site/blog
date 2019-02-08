import arrayToObj from 'array-to-obj';

export default async ({dom, jQuery}) => {
  const {getJSON} = jQuery;

  const container = dom.select('#social-profiles');
  const template = dom.select('#social-item-template').content;

  try {
    const responses = [
      getJSON({url: 'https://api.chrisvogt.me/profiles'}),
      getJSON({url: 'https://api.chrisvogt.me/metas'})
    ];
    const [profilesResponse, metasResponse] = await Promise.all(responses);
    const {result: {profiles: profilesArray = []} = {}} = profilesResponse;
    const {result: {metas: metasArray = []} = {}} = metasResponse;

    const {order, orderBy} = metasArray.find(meta => meta.key === 'socialProfilesOrder') || {};
    if (metasArray.length === 0 || !order || !orderBy) {
      throw new Error('Profile metadata not found.');
    }

    const profiles = arrayToObj(profilesArray, {key: orderBy});
    if (profilesArray.length === 0 || !profiles) {
      throw new Error('Profile data not found.');
    }

    const fragment = document.createDocumentFragment();
    order.forEach(key => {
      if (!profiles[key]) {
        return;
      }

      const content = template.cloneNode(true);
      const {
        displayName,
        href,
        icon
      } = profiles[key];

      const iconCss = icon.class.split(' ');
      content.querySelector('.social-item-icon').classList.add(...iconCss);

      const link = content.querySelector('.social-item-link');
      link.title = `Chris Vogt on ${displayName}`;
      link.href = href;

      fragment.appendChild(document.importNode(content, true));
    });

    container.innerHTML = '';
    container.appendChild(document.importNode(fragment, true));
  } catch (error) {
    console.warn('Error loading social profiles section', error);
    dom.select('#social').classList.add('hidden');
  }
};
