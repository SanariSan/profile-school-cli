const fetch = require('isomorphic-fetch');
const { DEFAULT_FETCH_OPTIONS, DEFAULT_FETCH_HEADERS, ETIME_SEC } = require('../app.const');
const { debugLog, debugDir } = require('../util');

async function request({ url, method, headers, body, fetchOtions }) {
  const retriesMax = 10;
  let retries = 0;
  let isError = false;
  let response;
  let timeoutId;

  do {
    isError = false;

    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 30 * ETIME_SEC.ONE);

    response = await fetch(url, {
      ...DEFAULT_FETCH_OPTIONS,
      ...fetchOtions,
      signal: controller.signal,
      headers: {
        ...DEFAULT_FETCH_HEADERS,
        ...headers,
      },
      method,
      body,
    }).catch((e) => {
      // clear signal because error just happened
      clearTimeout(timeoutId);
      debugLog('___Request error___');
      debugLog(e);
      debugDir(e);

      isError = true;
    });

    if (response)
      debugDir({ url: response.url, status: response.status, headers: response.headers });
  } while (isError && retries++ < retriesMax);

  if (isError || !response) throw new Error(EERROR_NAME.NO_RESPONSE);

  clearTimeout(timeoutId);

  return response;
}

module.exports = { request };
