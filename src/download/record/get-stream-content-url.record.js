const fetch = require('isomorphic-fetch');
const { log } = require('../../util');
const {
  EERROR_NAME,
  DEFAULT_FETCH_OPTIONS,
  DEFAULT_FETCH_HEADERS,
  EREGEXP,
} = require('../../app.const');

async function getStreamContentURL({ resolvedSourceUrl: url, cookies: Cookie }) {
  log('[~] Get stream content url');

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

  log('[~] Parse stream content url');

  const matchedURL = (await response.text()).match(EREGEXP.STREAM_CONTENT_URL);
  if (matchedURL === null) throw new Error(EERROR_NAME.CANT_PARSE_STREAM_CONTENT_LINK);

  return matchedURL[0];
}

module.exports = {
  getStreamContentURL,
};
