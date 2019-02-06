import '@babel/polyfill';
import loadLayoutModules from './load-layout-modules';

const __WWW_SITE__ = () => {
  loadLayoutModules();
};

$(document).foundation();
$(document).ready(__WWW_SITE__);
