import instagram from './instagram';
import latestCommit from './latest-commit';
import latestRepos from './latest-repos';
import quotes from './quotes';
import recentlyRead from './recently-read';
import socialProfiles from './social-profiles';
import twitter from './twitter';

const dom = {
  select: document.querySelector.bind(document)
};

const commonModules = [
  'social-profiles'
];

const registry = {
  instagram,
  'latest-commit': latestCommit,
  'latest-repository': latestRepos,
  quotes,
  'recently-read': recentlyRead,
  'social-profiles': socialProfiles,
  twitter
};

export default jQuery => {
  const config = window.__WWW_CONFIG__ || {};
  const args = {config, dom, jQuery};

  const modules = [
    ...commonModules,
    ...(window.__WWW_LAYOUT_MODULES__ ? window.__WWW_LAYOUT_MODULES__ : [])
  ];

  modules.forEach(moduleName => {
    try {
      return registry[moduleName] && registry[moduleName](args);
    } catch (error) {
      console.warn(`Error loading the ${moduleName} module.`, error);
    }
  });
};
