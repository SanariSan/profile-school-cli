const { EERROR_NAME } = require('../app.const');
const { log } = require('../util');

function handle(e) {
  // fallthrough, here just to indicate if error was expected or not
  switch (e.message) {
    case EERROR_NAME.NO_RESPONSE: {
      // fall through
    }
    case EERROR_NAME.NO_HANDSHAKE_COOKIES: {
      // fall through
    }
    case EERROR_NAME.NO_SIGNIN_COOKIES: {
      // fall through
    }
    case EERROR_NAME.NO_RESOLVE_RECORD_URL_LOCATION: {
      // fall through
    }
    case EERROR_NAME.NO_STREAM_CONTENT_LINK: {
      // fall through
    }
    case EERROR_NAME.NO_STREAM_SEGMENTS_PATH: {
      // fall through
    }
    case EERROR_NAME.NO_STREAM_SEGMENTS_NAMES: {
      // fall through
    }
    case EERROR_NAME.NO_AUTH_URL_LOCATION: {
      // fall through
    }
    case EERROR_NAME.NO_SESSION_URL_LOCATION: {
      // fall through
    }
    case EERROR_NAME.NO_SESSION_COOKIES: {
      // fall through
    }
    case EERROR_NAME.CANT_WRITE_COOKIE_FILE: {
      // fall through
    }
    case EERROR_NAME.NO_RESOLVE_COURCE_URL_LOCATION: {
      // fall through
    }
    case EERROR_NAME.CANT_READ_COOKIE_FILE: {
      log(`[!] Expected error caught: ${EERROR_NAME[e.message]}`);
      return;
    }
    default: {
      log('[!] Unexpected error caught');
      log(e);
      return;
    }
  }
}

module.exports = { handle };
