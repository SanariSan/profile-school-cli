const { saveCookies } = require('../save');
const { getHandshakeCookies } = require('./get-handshake-cookies.renew');
const { getSigninCookies } = require('./get-signin-cookies.renew');

async function renewCookies() {
  const { handshakeCookies } = await getHandshakeCookies();
  const { signinCookies } = await getSigninCookies({ cookies: handshakeCookies });

  saveCookies({ cookies: signinCookies });
}

module.exports = { renewCookies };
