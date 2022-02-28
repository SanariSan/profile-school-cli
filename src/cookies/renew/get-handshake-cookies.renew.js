const fetch = require('isomorphic-fetch');
const { EERROR_NAME, DEFAULT_FETCH_OPTIONS, EURL } = require('../../app.const');
const { log } = require('../../util');

async function getHandshakeCookies() {
  log('[~] Handshake');

  let isError = false;
  const response = await fetch(EURL.HANDSHAKE, DEFAULT_FETCH_OPTIONS).catch((e) => {
    isError = true;
  });

  if (isError || !response) throw new Error(EERROR_NAME.NO_HANDSHAKE_RESPONSE);
  if (!response.headers.has('set-cookie')) throw new Error(EERROR_NAME.NO_HANDSHAKE_COOKIES);

  return response.headers.get('set-cookie');
}

module.exports = {
  getHandshakeCookies,
};
