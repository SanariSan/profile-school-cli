const PWD = process.env.PWD;

const EPATH = {
  COOKIES: `${PWD}/cookies.txt`,
};

const ECHOICE = {
  DOWNLOAD: 0,
  RENEW_COOKIES: 1,
};

const EERROR_NAME = {
  NO_HANDSHAKE_RESPONSE: 0,
  NO_HANDSHAKE_COOKIES: 1,
  NO_SIGNIN_RESPONSE: 2,
  NO_SIGNIN_COOKIES: 3,
  CANT_WRITE_COOKIE_FILE: 4,
};

const UA = 'Mozilla/5.0 (Windows NT 10.0; rv:83.0) Gecko/20100101 Firefox/83.0';

module.exports = { ECHOICE, EPATH, EERROR_NAME, UA };
