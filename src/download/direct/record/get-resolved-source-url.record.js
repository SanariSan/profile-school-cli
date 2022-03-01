const { request } = require('../../../services');
const { log } = require('../../../util');
const { EERROR_NAME } = require('../../../app.const');

async function getResolvedSourceURL({ url, cookies: Cookie }) {
  log('[~] Get resolved url');

  const response = await request({
    url,
    headers: {
      Cookie,
    },
  });

  if (!response.headers.has('location'))
    throw new Error(EERROR_NAME.NO_RESOLVE_RECORD_URL_LOCATION);

  return {
    resolvedSourceUrl: response.headers.get('location'),
  };
}

module.exports = {
  getResolvedSourceURL,
};
