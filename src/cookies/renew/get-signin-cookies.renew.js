const { stringify } = require('querystring');
const { request } = require('../../services');
const { log } = require('../../util');
const { EERROR_NAME, EURL } = require('../../app.const');

async function getSigninCookies({ cookies: Cookie }) {
  log('[~] Sign in');

  const response = await request({
    url: EURL.SIGNIN,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie,
    },
    body: stringify({
      'signin[username]': process.env.LOG,
      'signin[password]': process.env.PASS,
      'signin[remember]': 'on',
    }),
  });

  if (!response.headers.has('set-cookie')) throw new Error(EERROR_NAME.NO_SIGNIN_COOKIES);

  return {
    signinCookies: response.headers.get('set-cookie'),
  };
}

module.exports = {
  getSigninCookies,
};
