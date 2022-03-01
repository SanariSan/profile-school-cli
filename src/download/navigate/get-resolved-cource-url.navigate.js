const { request } = require('../../services');
const { log } = require('../../util');
const { EERROR_NAME } = require('../../app.const');

async function getResolvedCourceURL({ url, cookies: Cookie }) {
  log('[~] Getting resolved url');

  const response = await request({
    url,
    headers: {
      Cookie,
    },
  });

  if (!response.headers.has('location'))
    throw new Error(EERROR_NAME.NO_RESOLVE_COURCE_URL_LOCATION);

  return {
    resolvedCourceUrl: response.headers.get('location'),
  };
}

module.exports = {
  getResolvedCourceURL,
};
