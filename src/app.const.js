const { caesar, makeEnum } = require('./util');

const ETIME_SEC = makeEnum({
  ONE: 1000,
  HALF: 500,
  QUARTER: 250,
  EIGHTH: 125,
});

const EPATH = makeEnum({
  COOKIES: `${process.env.PWD}/cookies.txt`,
  OUTPUT: `${process.env.PWD}/out`,
});

const ECHOICE = makeEnum({
  EXIT: 0,
  MAIN_MENU: 1,
  DIRECT: 2,
  NAVIGATE: 3,
  DOWNLOAD: 4,
  RENEW_COOKIES: 5,
  RECORD: 6,
  VOD: 7,
});

const EERROR_NAME = makeEnum({
  NO_RESPONSE: '0',
  NO_HANDSHAKE_COOKIES: '1',
  NO_SIGNIN_COOKIES: '2',
  NO_RESOLVE_RECORD_URL_LOCATION: '3',
  NO_STREAM_CONTENT_LINK: '4',
  NO_STREAM_SEGMENTS_PATH: '5',
  NO_STREAM_SEGMENTS_NAMES: '6',
  NO_AUTH_URL_LOCATION: '7',
  NO_SESSION_URL_LOCATION: '8',
  NO_SESSION_COOKIES: '9',
  NO_RESOLVE_COURCE_URL_LOCATION: '10',
  CANT_WRITE_COOKIE_FILE: '20',
  CANT_READ_COOKIE_FILE: '21',
});

// basic caesar obfuscation used on links to not get indexed by search engine
const EURL = makeEnum({
  HOST: caesar('iuuqt;00xxx/qspgjmftdippm/sv', -1),
  HANDSHAKE: caesar('iuuqt;00xxx/qspgjmftdippm/sv', -1),
  SIGNIN: caesar('iuuqt;00xxx/qspgjmftdippm/sv0tfdvsf0tjhojo', -1),
  COURCES: caesar('iuuqt;00xxx/qspgjmftdippm/sv0nz0ijtupsz', -1),
  RECORD_DEFAULT: caesar('iuuqt;00xxx/qspgjmftdippm/sv0nz0mfttpo`wjefp0447', -1),
  VOD_DEFAULT: caesar(
    'iuuqt;00xxx/qspgjmftdippm/sv0nz0wjfx`bsdijwf0G3lQ37fCThYf:x[42j:ukqNpzr63vbPz.txtxzRnpn9rgprgC3jOTTl2o29cZQJ1wXe.ypDE4KX.bR`2s8v[LjfLpSQqgVY9mvTTxOP3goV&8D',
    -1,
  ),
});

const DEFAULT_FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:83.0) Gecko/20100101 Firefox/83.0',
};

const DEFAULT_FETCH_OPTIONS = {
  method: 'GET',
  redirect: 'manual',
};

module.exports = {
  ETIME_SEC,
  EPATH,
  ECHOICE,
  EERROR_NAME,
  EURL,
  DEFAULT_FETCH_OPTIONS,
  DEFAULT_FETCH_HEADERS,
};
