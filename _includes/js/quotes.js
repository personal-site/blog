export default async ({config, dom, jQuery}) => {
  const selectURL = config => {
    const {
      quotes = {}
    } = config;
    return quotes;
  };

  const url = selectURL(config);
  if (!url) {
    console.warn('Unable to load the Quotes component without a config url.');
  }

  const template = dom.select('#quote-template').content;
  const container = dom.select('#quote-container');

  try {
    const {getJSON} = jQuery;
    const {result: {quotes} = {}} = await getJSON({url});
    const fragment = document.createDocumentFragment();

    if (!quotes || quotes.length === 0) {
      throw new Error('No quotes found.');
    }

    let i = 0;
    for (const quote of quotes) {
      const {cite, body} = quote;
      const content = template.cloneNode(true);
      const blockquote = content.querySelector('.quote-content');

      if (i === 0) {
        const carouselItem = content.querySelector('.carousel-item');
        carouselItem.classList.add('active');
      }

      const citeEl = document.createElement('cite');
      citeEl.append(document.createTextNode(cite));
      citeEl.classList.add('d-block');

      blockquote.append(document.createTextNode(body));
      blockquote.append(citeEl);

      fragment.append(content);
      i++;
    }

    container.append(document.importNode(fragment, true));
    $('.carousel').carousel()
  } catch (error) {
    console.warn('Error loading quotes section', error);
  }
};
