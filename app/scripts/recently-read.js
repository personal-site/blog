(async () => {
  const dom = {
    select: document.querySelector.bind(document)
  };

  const template = dom.select('#recent-book-template').content;
  const container = dom.select('#recent-books');

  try {
    const books = await $.getJSON({url: 'https://recently-read.chrisvogt.me'});

    for (const book of books.slice(0, 9)) {
      const content = template.cloneNode(true);

      const link = content.querySelector('.recent-book-link');
      link.title = `${book.title} on Google Books`;
      link.href = book.infoLink;

      const image = content.querySelector('.recent-book-image');
      image.src = book.smallThumbnail;
      image.alt = book.title;

      container.appendChild(document.importNode(content, true));
    }
  } catch (error) {
    console.warn('Error loading recently read section', error);
    dom.select('#recent-books').classList.add('hidden');
    dom.select('#primary-nav li[data-magellan-arrival="recently-read"]').classList.add('hidden');
  }
})();
