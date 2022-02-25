const { getHandshakeCookies } = require('./get-handshake-cookies.renew-cookies');
const { getSigninCookies } = require('./get-signin-cookies.renew-cookies');
const { saveCookies } = require('./save-cookies.renew-cookies');

async function renewCookies() {
  const handshakeCookies = await getHandshakeCookies();
  const signinCookies = await getSigninCookies({ handshakeCookies });

  saveCookies({ signinCookies });
}

module.exports = renewCookies;
