import renderInstaModal from './lib/render-insta-modal';

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

      const photosObj = photos.reduce((acc, photo = {}) => {
        const {
          id,
          user: {
            username = ''
          } = {},
          images = {},
          caption: {
            text = ''
          },
          comments: {
            count: commentsCount = 0
          } = {},
          likes: {
            count: likesCount = 0
          } = {},
          type,
          link,
          location: {
            name: locationName = ''
          } = {},
          created_time: createdAt
        } = photo;

        const item = {
          commentsCount,
          createdAt,
          id,
          images,
          likesCount,
          link,
          locationName,
          text,
          type,
          username
        };

        acc[id] = item;
        return acc;
      }, {});

      const getClickHandler = id => {
        const selected = photosObj[id];

        if (!selected) {
          return;
        }

        const handleThumbnailClick = event => {
          renderInstaModal({dom, photo: selected});
          event.preventDefault();
        };

        return handleThumbnailClick;
      };

      for (const photo of photos.filter(photo => photo.type === 'image').slice(0, 12)) {
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
