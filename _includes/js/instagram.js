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

      const filtered = photos.filter(photo => photo.type === 'image');
      const photosObj = filtered.reduce(transformPhotos, {});

      const getClickHandler = id => {
        const selected = photosObj[id];

        if (!selected) {
          return;
        }

        const handleThumbnailClick = event => {
          try {
            renderInstagramModal({dom, photo: selected});
          } catch (error) {
            console.warn('Error opening Instagram modal.', error);
          }

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

      $('#instagram-feed').removeClass('hidden');
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.warn('Error loading Instagram component', error);
  }
};
