export default async ({config, dom, jQuery}) => {
  console.log(config);

  const selectURL = config => {
    const {
      goodreadsUpdates
    } = config;
    return goodreadsUpdates;
  };

  const url = selectURL(config);
  if (!url) {
    console.warn('Unable to load the Reading Updates component without a config url.');
  }

  const container = dom.select('#reading-updates');
  const reviewTemplate = dom.select('#reading-update-review-template').content;
  const statusTemplate = dom.select('#reading-update-status-template').content;

  try {
    const {getJSON} = jQuery;
    const updates = await getJSON({url});
    for (const update of updates) {
      console.log('update...', update);
      const {type} = update;
      const content = type === 'userstatus'
        ? statusTemplate.cloneNode(true)
        ? reviewTemplate.cloneNode(true);

      // const link = content.querySelector('.recent-book-link');
      // link.title = `${book.title} on Google Books`;
      // link.href = book.infoLink;

      // const image = content.querySelector('.recent-book-image');
      // image.src = book.smallThumbnail;
      // image.alt = book.title;

      // bookList.append(document.importNode(content, true));
      // [container].forEach(el => el.classList.remove('hidden'));
    }
  } catch (error) {
    console.warn('Error loading recently read section', error);
  }
};
