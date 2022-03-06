const { debugDir } = require('../../util');
const { saveCookies } = require('../save');
const { getHandshakeCookies } = require('./get-handshake-cookies.renew');
const { getSigninCookies } = require('./get-signin-cookies.renew');

async function renewCookies() {
  const { handshakeCookies } = await getHandshakeCookies();
  debugDir(handshakeCookies);
  const { signinCookies } = await getSigninCookies({ cookies: handshakeCookies });
  debugDir(signinCookies);

  saveCookies({ cookies: signinCookies });
}

module.exports = { renewCookies };
