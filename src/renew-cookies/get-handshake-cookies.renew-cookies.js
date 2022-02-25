const fetch = require('isomorphic-fetch');
const { UA, EERROR_NAME } = require('../app.const');
const { log } = require('../util');

async function getHandshakeCookies() {
  let isError = false;
  const response = await fetch(process.env.HANDSHAKE_URL, {
    headers: {
      'User-Agent': UA,
    },
  }).catch((e) => {
    isError = true;
  });

  if (isError || !response) throw new Error(EERROR_NAME.NO_HANDSHAKE_RESPONSE);
  if (!response.headers.has('set-cookie')) throw new Error(EERROR_NAME.NO_HANDSHAKE_COOKIES);

  log('[~] Handshake');

  return response.headers.get('set-cookie');
}

module.exports = {
  getHandshakeCookies,
};
