const { getAuthURL } = require('./get-auth-url.vod');
const { getSessionCookiesURL } = require('./get-session-cookies-url.vod');
const { getStreamURL } = require('./get-stream-url.vod');
const { generalStreamDownloadProcess } = require('../general-stream-logic');

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

  await generalStreamDownloadProcess({ streamUrlBase, streamPathIndex, outputName });
}

module.exports = { vodDownload };
