const { request } = require('../../../services');
const { log } = require('../../../util');
const { EERROR_NAME } = require('../../../app.const');

async function getSessionCookiesURL({ url, cookies: Cookie }) {
  log('[~] Get resolved url');

  const response = await request({
    url,
    headers: {
      Cookie,
    },
  });

  if (!response.headers.has('location')) throw new Error(EERROR_NAME.NO_SESSION_URL_LOCATION);
  if (!response.headers.has('set-cookie')) throw new Error(EERROR_NAME.NO_SESSION_COOKIES);

  return {
    resolvedSourceUrl: response.headers.get('location'),
    sessionCookies: response.headers.get('set-cookie'),
  };
}

module.exports = {
  getSessionCookiesURL,
};
