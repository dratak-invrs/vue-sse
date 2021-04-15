import SSEClient, { formatText } from './sse-client';

export function install(app, config) {
  // eslint-disable-next-line no-param-reassign, no-multi-assign
  app.config.globalProperties.$sse = new SSEManager(config);

  if (config && config.polyfill) {
    import('event-source-polyfill');
  }
}

export class SSEManager {
  constructor(config) {
    this.$defaultConfig = Object.assign(
      {
        format: formatText,
        sendCredentials: false,
      },
      config,
    );
  }

  create(configOrURL) {
    let config;
    if (typeof configOrURL === 'object') {
      config = configOrURL;
    } else if (typeof configOrURL === 'string') {
      config = {
        url: configOrURL,
      };
    } else {
      config = {};
    }

    return new SSEClient(Object.assign({}, this.$defaultConfig, config));
  }
}

export default SSEManager;
