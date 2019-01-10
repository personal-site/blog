export default async ({dom, jQuery}) => {
  const container = dom.select('#recently-read');
  const bookList = dom.select('#recent-books');
  const navButton = dom.select('#primary-nav li[data-magellan-arrival="recently-read"]');
  const template = dom.select('#recent-book-template').content;

  try {
    const {getJSON} = jQuery;
    const books = await getJSON({url: 'https://recently-read.chrisvogt.me'});
    for (const book of books.slice(0, 9)) {
      const content = template.cloneNode(true);

      const link = content.querySelector('.recent-book-link');
      link.title = `${book.title} on Google Books`;
      link.href = book.infoLink;

      const image = content.querySelector('.recent-book-image');
      image.src = book.smallThumbnail;
      image.alt = book.title;

      bookList.appendChild(document.importNode(content, true));
      [container, navButton].forEach(el => el.classList.remove('hidden'));
    }
  } catch (error) {
    console.warn('Error loading recently read section', error);
  }
};
