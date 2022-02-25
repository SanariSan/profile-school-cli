const fetch = require('isomorphic-fetch');
const { stringify } = require('querystring');
const { UA, EERROR_NAME } = require('../app.const');
const { log } = require('../util');

async function getSigninCookies({ handshakeCookies: Cookie }) {
  let isError = false;
  const response = await fetch(process.env.SIGNIN_URL, {
    method: 'POST',
    redirect: 'manual',
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie,
    },
    body: stringify({
      'signin[username]': process.env.LOG,
      'signin[password]': process.env.PASS,
      'signin[remember]': 'on',
    }),
  }).catch((e) => {
    isError = true;
  });

  if (isError || !response) throw new Error(EERROR_NAME.NO_SIGNIN_RESPONSE);
  if (!response.headers.has('set-cookie')) throw new Error(EERROR_NAME.NO_SIGNIN_COOKIES);

  log('[~] Sign in');

  return response.headers.get('set-cookie');
}

module.exports = {
  getSigninCookies,
};
