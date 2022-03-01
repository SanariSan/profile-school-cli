const { getAuthURL } = require('./get-auth-url.vod');
const { getSessionCookiesURL } = require('./get-session-cookies-url.vod');
const { getStreamURL } = require('./get-stream-url.vod');
const {
  clipSegments,
  getStreamSegmentsNames,
  getStreamSegmentsPath,
  getStreamSegmentsRaw,
} = require('../general-stream-logic');

async function vodDownload({ initialSourceUrl, cookies, outputName }) {
  // get auth url
  const { authUrl } = await getAuthURL({ url: initialSourceUrl, cookies });

  // get resolved url + short-life session cookies
  const { resolvedSourceUrl, sessionCookies } = await getSessionCookiesURL({ url: authUrl });

  // get direct stream url
  const { streamUrlBase, streamPathIndex } = await getStreamURL({
    url: resolvedSourceUrl,
    cookies: sessionCookies,
  });

  // get path for segments names grab
  const { streamSegmentsPathBase, streamSegmentsPathSource } = await getStreamSegmentsPath({
    url: `${streamUrlBase}/${streamPathIndex}`,
  });

  // get segments names
  const { streamSegmentsNames } = await getStreamSegmentsNames({
    url: `${streamUrlBase}/${streamSegmentsPathBase}/${streamSegmentsPathSource}`,
  });

  // get array of promises with segments and immediately go to the next step of clipping
  const { segmentsRaw } = await getStreamSegmentsRaw({
    url: `${streamUrlBase}/${streamSegmentsPathBase}`,
    segments: streamSegmentsNames,
  });

  // clip segments as they being downloaded
  await clipSegments({ segmentsRaw, outputName });
}

module.exports = { vodDownload };
