const { getResolvedSourceURL } = require('./get-resolved-source-url.record');
const { getStreamURL } = require('./get-stream-url.record');
const { generalStreamDownloadProcess } = require('../general-stream-logic');
const { debugDir } = require('../../../util');

async function recordDownload({ initialSourceUrl, cookies, outputName }) {
  // get base stream source url
  const { resolvedSourceUrl } = await getResolvedSourceURL({ url: initialSourceUrl, cookies });
  debugDir({ resolvedSourceUrl });

  // get direct stream url
  const { streamUrlBase, streamPathIndex } = await getStreamURL({
    url: resolvedSourceUrl,
    cookies,
  });
  debugDir({ streamUrlBase, streamPathIndex });

  await generalStreamDownloadProcess({ streamUrlBase, streamPathIndex, outputName });
}

module.exports = { recordDownload };
