import renderInstagramModal from './renderers/instagram-modal';
import transformPhotos from './utils/transform-photos';

export default async ({config, dom, jQuery}) => {
  const {
    instagram: url
  } = config;

  const thumbnailContainer = dom.select('ul#feed');
  const thumbnailTemplate = dom.select('#instagram-thumbnail-template').content;

  try {
    if (!url || typeof url !== 'string') {
      throw new Error('Unable to load Instagram without a config URL.');
    }

    try {
      const {getJSON} = jQuery;
      const {result: {photos} = {}} = await getJSON({url});

      // NOTE: the initial version of this modal only supported rendering
      // image previews, but enough data is available to render embedded
      // video previews of Instagram media.
      const filtered = photos.filter(photo => photo.type === 'image');
      const photosObj = filtered.reduce(transformPhotos, {});

      console.log(photosObj);
      window.instagramPhotos = photosObj;

      const getClickHandler = id => {
        const selected = photosObj[id];

        console.log('Looking for ', id);
        console.log('Generating click handler...', selected);

        if (!selected) {
          console.log('Missing photo in object');
          return;
        }

        const handleThumbnailClick = event => {
          renderInstagramModal({dom, photo: selected});
          event.preventDefault();
        };

        return handleThumbnailClick;
      };

      for (const photo of filtered.slice(0, 12)) {
        const content = thumbnailTemplate.cloneNode(true);

        const img = content.querySelector('.ig-thumb-image');
        img.src = photo.images.thumbnail.url;
        img.height = photo.images.thumbnail.height;
        img.width = photo.images.thumbnail.width;

        const link = content.querySelector('.ig-thumb-link');
        link.dataset.id = photo.id;

        thumbnailContainer.appendChild(document.importNode(content, true));
      }

      const links = thumbnailContainer.getElementsByClassName('ig-thumb-link');
      [...links].forEach(link => link.addEventListener('click', getClickHandler(link.dataset.id)));

      $('#photos').removeClass('hidden');
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.warn('Error loading Instagram component', error);
  }
};
