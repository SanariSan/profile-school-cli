const fetch = require('isomorphic-fetch');
const { stringify } = require('querystring');
const {
  EERROR_NAME,
  DEFAULT_FETCH_OPTIONS,
  DEFAULT_FETCH_HEADERS,
  EURL,
} = require('../../app.const');
const { log } = require('../../util');

async function getSigninCookies({ handshakeCookies: Cookie }) {
  log('[~] Sign in');

  let isError = false;
  const response = await fetch(EURL.SIGNIN, {
    ...DEFAULT_FETCH_OPTIONS,
    method: 'POST',
    headers: {
      ...DEFAULT_FETCH_HEADERS,
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

  return response.headers.get('set-cookie');
}

module.exports = {
  getSigninCookies,
};
