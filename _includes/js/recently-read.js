export default async ({config, dom, jQuery}) => {
  const selectURL = config => {
    const {
      recentlyRead
    } = config;
    return recentlyRead;
  };

  const url = selectURL(config);
  if (!url) {
    console.warn('Unable to load the Recently Read component without a config url.');
  }

  const bookList = dom.select('#recent-books');
  const container = dom.select('#recently-read');
  const template = dom.select('#recent-book-template').content;

  try {
    const {getJSON} = jQuery;
    const books = await getJSON({url});
    for (const book of books.slice(0, 9)) {
      const content = template.cloneNode(true);

      const link = content.querySelector('.recent-book-link');
      link.title = `${book.title} on Google Books`;
      link.href = book.infoLink;

      const image = content.querySelector('.recent-book-image');
      image.src = book.smallThumbnail;
      image.alt = book.title;

      bookList.append(document.importNode(content, true));
      [container].forEach(el => el.classList.remove('hidden'));
    }
  } catch (error) {
    console.warn('Error loading recently read section', error);
  }
};
