const { caesar } = require('./util');

const EPATH = {
  COOKIES: `${process.env.PWD}/cookies.txt`,
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
  NO_RESOLVE_RECORD_URL_RESPONSE: 4,
  NO_RESOLVE_RECORD_URL_LOCATION_HEADER: 5,
  NO_GET_STREAM_CONTENT_LINK_RESPONSE: 6,
  CANT_PARSE_STREAM_CONTENT_LINK: 7,
  CANT_WRITE_COOKIE_FILE: 20,
  CANT_READ_COOKIE_FILE: 21,
};

// basic caesar obfuscation used on links to not get indexed by search engine
const EURL = {
  HANDSHAKE: caesar('iuuqt;00xxx/qspgjmftdippm/sv', -1),
  SIGNIN: caesar('iuuqt;00xxx/qspgjmftdippm/sv0tfdvsf0tjhojo', -1),
  RECORD_DEFAULT: caesar('iuuqt;00xxx/qspgjmftdippm/sv0nz0mfttpo`wjefp0447', -1),
};

const EREGEXP = {
  STREAM_CONTENT_URL: new RegExp(caesar('iuuqt;]0]0i/qspgjmfmbc/sv]0izcsje]0]x,@/2191/nq5', -1)),
};

const DEFAULT_FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:83.0) Gecko/20100101 Firefox/83.0',
};

const DEFAULT_FETCH_OPTIONS = {
  method: 'GET',
  headers: { ...DEFAULT_FETCH_HEADERS },
  redirect: 'manual',
};

module.exports = {
  ECHOICE,
  EPATH,
  EERROR_NAME,
  EURL,
  EREGEXP,
  DEFAULT_FETCH_OPTIONS,
  DEFAULT_FETCH_HEADERS,
};
