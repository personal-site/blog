const getRelativeTimeSinceString = date => {
  const {timeago} = $;
  const timeInSeconds = Number(date) * 1000;
  return timeago ? timeago(timeInSeconds) : new Date(date).toISOString();
};

export default ({dom, photo}) => {
  if (!dom) {
    console.log('A dom object is required');
  }

  if (!photo) {
    console.log('A photo object is required');
  }

  const container = dom.select('#photos');
  const template = dom.select('#instagram-modal-template').content;
  const content = template.cloneNode(true);

  const {
    images: {
      standard_resolution: {
        url
      } = {}
    } = {}
  } = photo;

  content.querySelector('.ig-comments-count').textContent = photo.commentsCount;
  content.querySelector('.ig-likes-count').textContent = photo.likesCount;
  content.querySelector('.ig-modal-image').src = url || '';
  content.querySelector('.ig-modal-link').href = photo.link;
  content.querySelector('.ig-modal-location').textContent = photo.locationName;
  content.querySelector('.ig-modal-text').textContent = photo.text;
  content.querySelector('.ig-time-ago').textContent = getRelativeTimeSinceString(photo.createdAt);

  const closeModal = () => {
    console.log('closing modal...');
    dom.select('#instagram-overlay').remove();
    dom.select('body').classList.remove('ig-modal-open');
  };

  const node = document.importNode(content, true);
  node.querySelector('.ig-modal-close').addEventListener('click', closeModal);
  dom.select('body').classList.add('ig-modal-open');

  const handleCloseClick = event => {
    if (event.key === 'Escape') {
      dom.select('#instagram-overlay').remove();
      dom.select('body').classList.remove('ig-modal-open');
      event.target.removeEventListener('keyup', handleCloseClick);
    }
  };
  document.addEventListener('keyup', handleCloseClick);

  container.appendChild(node);
};
