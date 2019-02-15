const getRelativeTimeSinceString = date => {
  const {timeago} = $;
  return timeago ? timeago(date) : new Date(date).toISOString();
};

export default async ({config, dom, jQuery}) => {
  const selectURL = config => {
    const {
      latestCommit: {
        url,
        username
      } = {}
    } = config;

    console.log(config);

    return url ? url.replace('{username}', username) : null;
  };

  const url = selectURL(config);

  console.log(url);
  console.log('LATEST COMMIT');

  console.log(config);

  if (!url) {
    console.warn('Unable to load the Latest Commit component without a config url.');
  }

  const {getJSON} = jQuery;
  const username = 'chrisvogt';
  const response = await getJSON({url});

  const latestPushEvent = response.find(event => event.type === 'PushEvent');
  const {repo, payload, created_at: createdAt} = latestPushEvent;

  const latestCommit = payload.commits.reverse()[0];
  if (!latestCommit) {
    dom.select('#latest-commit').textContent = 'No commit';
    return;
  }

  const repoUrl = `https://github.com/${repo.name}`;

  const commitTitleElement = dom.select('#latest-commit .commit-title');
  commitTitleElement.href = `${repoUrl}/commit/${latestCommit.sha}`;
  commitTitleElement.textContent = latestCommit.message;

  const commitDateElement = dom.select('#latest-commit .commit-date');
  commitDateElement.setAttribute('datetime', createdAt);
  commitDateElement.textContent = getRelativeTimeSinceString(createdAt);

  const repoTitleElement = dom.select('#latest-commit .repo-title');
  repoTitleElement.href = repoUrl;
  repoTitleElement.textContent = repo.name.replace(new RegExp(`^${username}/`), '');
};
