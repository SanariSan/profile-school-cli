const fetch = require('isomorphic-fetch');
const { log } = require('../../util');
const { EERROR_NAME, DEFAULT_FETCH_OPTIONS, DEFAULT_FETCH_HEADERS } = require('../../app.const');

async function getResolvedSourceURL({ unresolvedSourceUrl: url, cookies: Cookie }) {
  log('[~] Get resolved url');

  let isError = false;
  const response = await fetch(url, {
    ...DEFAULT_FETCH_OPTIONS,
    headers: {
      ...DEFAULT_FETCH_HEADERS,
      Cookie,
    },
  }).catch((e) => {
    isError = true;
  });

  if (isError || !response) throw new Error(EERROR_NAME.NO_RESOLVE_RECORD_URL_RESPONSE);
  if (!response.headers.has('location'))
    throw new Error(EERROR_NAME.NO_RESOLVE_RECORD_URL_LOCATION_HEADER);

  return response.headers.get('location');
}

module.exports = {
  getResolvedSourceURL,
};
