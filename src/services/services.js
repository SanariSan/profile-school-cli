const fetch = require('isomorphic-fetch');
const { DEFAULT_FETCH_OPTIONS, DEFAULT_FETCH_HEADERS } = require('../app.const');
const { debugLog, debugDir, sleep } = require('../util');

async function request({
  url,
  method,
  headers,
  body,
  fetchOtions,
  timeoutSec = 30,
  maxAttempts = 10,
}) {
  let attemptsDone = 0;
  let isError = false;
  let response;

  const requestInternal = (controller) =>
    fetch(url, {
      ...DEFAULT_FETCH_OPTIONS,
      ...fetchOtions,
      headers: {
        ...DEFAULT_FETCH_HEADERS,
        ...headers,
      },
      signal: controller.signal,
      method,
      body,
    }).catch((e) => {
      debugLog('___Request error___');
      debugLog(e);
      debugDir(e);
    });

  do {
    if (attemptsDone > 0) {
      await sleep(10 * 1000);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutSec * 1000);
    isError = false;
    attemptsDone += 1;

    response = await requestInternal(controller);
    clearTimeout(timeoutId);

    if (response === undefined) {
      isError = true;
    } else {
      debugDir({ url: response.url, status: response.status, headers: response.headers });
    }
  } while (isError && attemptsDone < maxAttempts);

  if (isError || !response) throw new Error(EERROR_NAME.NO_RESPONSE);

  return response;
}

module.exports = { request };
