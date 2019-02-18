export default (acc, photo = {}) => {
  const {
    id,
    user: {
      full_name: fullName = '',
      profile_picture: profilePicture = '',
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
    fullName,
    id,
    images,
    likesCount,
    link,
    locationName,
    profilePicture,
    text,
    type,
    username
  };

  acc[id] = item;
  return acc;
};
