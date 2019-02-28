const getRelativeTimeSinceString = date => {
  const {timeago} = $;
  const timeInSeconds = Number(date) * 1000;
  return timeago ? timeago(timeInSeconds) : new Date(date).toISOString();
};

export default ({dom, photo}) => {
  if (!dom) {
    throw new TypeError('Instagram modal requires a DOM object.');
  }

  if (!photo) {
    throw new TypeError('Instagram modal requires a photo to render.');
  }

  const container = dom.select('#ig--feed');
  const template = dom.select('#instagram-modal-template').content;
  const content = template.cloneNode(true);

  content.querySelector('.ig-comments-count').textContent = photo.commentsCount;
  content.querySelector('.ig-likes-count').textContent = photo.likesCount;
  content.querySelector('.img-modal-avatar').src = photo.profilePicture;
  content.querySelector('.ig-modal-image').src = photo.images.standard_resolution.url;
  content.querySelector('.ig--modal-link').href = photo.link;
  content.querySelector('.ig-modal-location').textContent = photo.locationName;
  content.querySelector('.ig-modal-text').textContent = photo.text;
  content.querySelector('.ig-time-ago').textContent = getRelativeTimeSinceString(photo.createdAt);

  const usernameLink = content.querySelector('.ig-modal-username-link');
  usernameLink.href = `https://instagram.com/${photo.username}`;
  usernameLink.title = photo.fullName;

  const closeModal = event => {
    dom.select('#ig--overlay').remove();
    dom.select('body').classList.remove('ig--modal-open');
    event.preventDefault();
  };

  const handleCloseClick = event => {
    if (event.key === 'Escape') {
      closeModal(event);
      event.target.removeEventListener('keyup', handleCloseClick);
    }
  };

  const node = document.importNode(content, true);
  dom.select('body').classList.add('ig--modal-open');

  node.querySelector('.ig--modal-close').addEventListener('click', closeModal);
  document.addEventListener('keyup', handleCloseClick);

  container.append(node);
};
