import loadLayoutModules from './load-layout-modules';

const __WWW_SITE__ = () => {
  $(document).foundation();

  loadLayoutModules();

  $(document).foundation({
    'magellan-expedition': {
      /* eslint-disable camelcase */
      active_class: 'active',
      threshold: false,
      destination_threshold: 20,
      throttle_delay: 50,
      fixed_top: 0,
      offset_by_height: true
      /* eslint-enable camelcase */
    }
  });
};

$(document).ready(__WWW_SITE__);
