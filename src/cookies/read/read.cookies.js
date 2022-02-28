const { readFileSync } = require('fs');
const { EERROR_NAME, EPATH } = require('../../app.const');

function readCookies() {
  try {
    return readFileSync(EPATH.COOKIES, 'utf-8');
  } catch (e) {
    throw new Error(EERROR_NAME.CANT_READ_COOKIE_FILE);
  }
}

module.exports = {
  readCookies,
};
