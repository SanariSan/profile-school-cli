const fetch = require('isomorphic-fetch');
const { DEFAULT_FETCH_OPTIONS, DEFAULT_FETCH_HEADERS } = require('../app.const');

async function request({ url, method, headers, body, fetchOtions }) {
  let isError = false;
  const response = await fetch(url, {
    ...DEFAULT_FETCH_OPTIONS,
    ...fetchOtions,
    headers: {
      ...DEFAULT_FETCH_HEADERS,
      ...headers,
    },
    method,
    body,
  }).catch((e) => {
    isError = true;
  });

  if (isError || !response) throw new Error(EERROR_NAME.NO_RESPONSE);

  return response;
}

module.exports = { request };
