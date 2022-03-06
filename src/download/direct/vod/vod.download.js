const { getAuthURL } = require('./get-auth-url.vod');
const { getSessionCookiesURL } = require('./get-session-cookies-url.vod');
const { getStreamURLS } = require('./get-stream-urls.vod');
const { generalStreamDownloadProcess } = require('../general-stream-logic');
const { debugDir } = require('../../../util');

async function vodDownload({ initialSourceUrl, cookies, outputName }) {
  // get auth url
  const { authUrl } = await getAuthURL({ url: initialSourceUrl, cookies });
  debugDir(authUrl);

  // get resolved url + short-life session cookies
  const { resolvedSourceUrl, sessionCookies } = await getSessionCookiesURL({ url: authUrl });
  debugDir({ resolvedSourceUrl, sessionCookies });

  // get direct stream urls
  // [{ streamUrlBase, streamPathIndex }, ]
  const { streamUrls } = await getStreamURLS({
    url: resolvedSourceUrl,
    cookies: sessionCookies,
  });
  debugDir({ streamUrls });

  let i = 0;
  for (let { streamUrlBase, streamPathIndex } of streamUrls) {
    await generalStreamDownloadProcess({
      streamUrlBase,
      streamPathIndex,
      outputName: `${outputName}_${i++}`,
    });
  }
}

module.exports = { vodDownload };
