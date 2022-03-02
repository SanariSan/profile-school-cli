const { debugLog } = require('../../../util');
const { request } = require('../../../services');
const { EERROR_NAME } = require('../../../app.const');

async function getStreamURL({ url, cookies: Cookie }) {
  debugLog('[~] Getting stream url');

  const response = await request({ url, headers: { Cookie } });

  debugLog('[~] Parsing stream url');

  const matchedURL = (await response.text()).match(/setup\(\{file: "(.+?)"/);
  if (matchedURL === null) throw new Error(EERROR_NAME.NO_STREAM_CONTENT_LINK);

  // get rid of escape chars
  const u = matchedURL[1].replace(/\\/g, '');

  return {
    streamUrlBase: u.slice(0, u.lastIndexOf('/')),
    streamPathIndex: u.slice(u.lastIndexOf('/') + 1),
  };
}

module.exports = {
  getStreamURL,
};
