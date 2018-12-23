export default async jQuery => {
  const dom = {
    select: document.querySelector.bind(document)
  };

  const username = 'chrisvogt';
  const response = await $.getJSON({url: `https://api.github.com/users/${username}/events/public`});

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
  commitDateElement.textContent = jQuery.timeago(createdAt);

  const repoTitleElement = dom.select('#latest-commit .repo-title');
  repoTitleElement.href = repoUrl;
  repoTitleElement.textContent = repo.name.replace(new RegExp(`^${username}/`), '');
};
