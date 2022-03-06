const { debugLog } = require('../../../util');
const { request } = require('../../../services');
const { EERROR_NAME } = require('../../../app.const');

async function getStreamURLS({ url, cookies: Cookie }) {
  debugLog('[~] Getting stream url');

  const response = await request({ url, headers: { Cookie } });

  debugLog('[~] Parsing stream url');

  const body = await response.text();
  const matchedURL = body.match(/"stream":"(.+?)"/);
  const matchedWebcamURL = body.match(/"webcam_stream":"(.+?)"/);

  if (matchedURL === null) throw new Error(EERROR_NAME.NO_STREAM_CONTENT_LINK);

  const streamUrls = [];

  // get rid of escape chars
  const u = matchedURL[1].replace(/\\/g, '');

  streamUrls.push({
    streamUrlBase: u.slice(0, u.lastIndexOf('/')),
    streamPathIndex: u.slice(u.lastIndexOf('/') + 1),
  });

  if (matchedWebcamURL !== null) {
    // get rid of escape chars
    const uWebcam = matchedWebcamURL[1].replace(/\\/g, '');
    streamUrls.push({
      streamUrlBase: uWebcam.slice(0, uWebcam.lastIndexOf('/')),
      streamPathIndex: uWebcam.slice(uWebcam.lastIndexOf('/') + 1),
    });
  }

  debugLog(streamUrls);

  return { streamUrls };
}

module.exports = {
  getStreamURLS,
};
