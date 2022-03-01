const { request } = require('../../services');
const { EERROR_NAME, EURL } = require('../../app.const');
const { log } = require('../../util');

async function getHandshakeCookies() {
  log('[~] Handshake');

  const response = await request({ url: EURL.HANDSHAKE });

  if (!response.headers.has('set-cookie')) throw new Error(EERROR_NAME.NO_HANDSHAKE_COOKIES);

  return {
    handshakeCookies: response.headers.get('set-cookie'),
  };
}

module.exports = {
  getHandshakeCookies,
};
