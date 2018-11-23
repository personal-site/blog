(async () => {
  const dom = {
    select: document.querySelector.bind(document)
  };

  const template = dom.select('#quote-template').content;
  const container = dom.select('#quote-container');

  try {
    const {quotes} = await $.getJSON({
      url: 'https://cdn.rawgit.com/chrisvogt/49b51791348a09cbddb0/raw/585d1712885dda5c13d63c17b5e093d543640e42/book-quotes.json'
    });
    const fragment = document.createDocumentFragment();

    if (!quotes || quotes.length === 0) {
      throw new Error('No quotes found.');
    }

    for (const quote of quotes) {
      const {cite, text} = quote;
      const content = template.cloneNode(true);
      const blockquote = content.querySelector('.quote-content');

      const citeEl = document.createElement('cite');
      citeEl.appendChild(document.createTextNode(cite));

      blockquote.appendChild(document.createTextNode(text));
      blockquote.appendChild(citeEl);

      fragment.appendChild(content);
    }

    container.appendChild(document.importNode(fragment, true));
  } catch (error) {
    console.warn('Error loading quotes section', error);
  }
})();
