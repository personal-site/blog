import chunkArray from './utils/chunk-array';
import renderInstagramModal from './renderers/instagram-modal';
import transformPhotos from './utils/transform-photos';

export default async ({config, dom, jQuery}) => {
  const {
    instagram: url
  } = config;

  const thumbnailContainer = dom.select('#feed');
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

      const CONFIG_COLUMN_MAX_PHOTOS = 3;
      const filteredPhotos = filtered.slice(0, 12);
      const photoFeedArray = chunkArray(filteredPhotos, CONFIG_COLUMN_MAX_PHOTOS);

      // NOTE(cvogt): loop through the chunked array of photos and create a
      // '.column' div element containing photos from each chunked set.
      const photoFeedFragment = photoFeedArray.reduce((fragment, photoSet) => {
        const column = document.createElement('div');
        column.className = 'column';

        for (const photo of photoSet) {
          const content = thumbnailTemplate.cloneNode(true);

          const img = content.querySelector('.ig-thumb-image');
          img.src = photo.images.low_resolution.url;

          const link = content.querySelector('.ig-thumb-link');
          link.dataset.id = photo.id;

          column.appendChild(document.importNode(content, true));
        }

        fragment.append(column);

        return fragment;
      }, document.createDocumentFragment());

      thumbnailContainer.append(photoFeedFragment);

      const links = thumbnailContainer.querySelectorAll('.ig-thumb-link');
      [...links].forEach(link => link.addEventListener('click', getClickHandler(link.dataset.id)));

      $('#ig--feed').removeClass('hidden');
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.warn('Error loading Instagram component', error);
  }
};
