const { request } = require('../../services');
const { EERROR_NAME, EURL } = require('../../app.const');
const { debugLog } = require('../../util');

async function getHandshakeCookies() {
  debugLog('[~] Handshake');

  const response = await request({ url: EURL.HOST });

  if (!response.headers.has('set-cookie')) throw new Error(EERROR_NAME.NO_HANDSHAKE_COOKIES);

  return {
    handshakeCookies: response.headers.get('set-cookie'),
  };
}

module.exports = {
  getHandshakeCookies,
};
