const { request } = require('../../../services');
const { log } = require('../../../util');
const { EERROR_NAME } = require('../../../app.const');

async function getAuthURL({ url, cookies: Cookie }) {
  log('[~] Get resolved url');

  const response = await request({
    url,
    headers: {
      Cookie,
    },
  });

  if (!response.headers.has('location')) throw new Error(EERROR_NAME.NO_AUTH_URL_LOCATION);

  return {
    authUrl: response.headers.get('location'),
  };
}

module.exports = {
  getAuthURL,
};
