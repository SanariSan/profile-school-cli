const { getResolvedSourceURL } = require('./get-resolved-source-url.record');
const { getStreamURL } = require('./get-stream-url.record');
const { generalStreamDownloadProcess } = require('../general-stream-logic');

async function recordDownload({ initialSourceUrl, cookies, outputName }) {
  // get base stream source url
  const { resolvedSourceUrl } = await getResolvedSourceURL({ url: initialSourceUrl, cookies });

  // get direct stream url
  const { streamUrlBase, streamPathIndex } = await getStreamURL({
    url: resolvedSourceUrl,
    cookies,
  });

  await generalStreamDownloadProcess({ streamUrlBase, streamPathIndex, outputName });
}

module.exports = { recordDownload };
