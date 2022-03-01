const { writeFileSync } = require('fs');
const { EPATH, EERROR_NAME } = require('../../app.const');

function saveCookies({ cookies }) {
  try {
    writeFileSync(EPATH.COOKIES, cookies);
  } catch (e) {
    throw new Error(EERROR_NAME.CANT_WRITE_COOKIE_FILE);
  }

  return undefined;
}

module.exports = { saveCookies };
