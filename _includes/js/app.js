import '@babel/polyfill';

import loadLayoutModules from './load-layout-modules';

$().ready(() => {
  loadLayoutModules($);
});
