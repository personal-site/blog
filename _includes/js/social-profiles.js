import arrayToObj from 'array-to-obj';

const selectMetasURL = config => {
  const {
    metas
  } = config;
  return metas;
};

const selectProfilesURL = config => {
  const {
    profiles
  } = config;
  return profiles;
};

export default async ({config, dom, jQuery}) => {
  const metasURL = selectMetasURL(config);
  const profilesURL = selectProfilesURL(config);

  if (!metasURL || !profilesURL) {
    console.warn('Unable to load the Social Profiles component without metas and profiles urls.');
  }

  const container = dom.select('#social-profiles');
  const template = dom.select('#social-item-template').content;

  try {
    const {getJSON} = jQuery;
    const responses = [
      getJSON({url: metasURL}),
      getJSON({url: profilesURL})
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
