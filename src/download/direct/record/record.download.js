const { getResolvedSourceURL } = require('./get-resolved-source-url.record');
const { getStreamURL } = require('./get-stream-url.record');
const {
  clipSegments,
  getStreamSegmentsNames,
  getStreamSegmentsPath,
  getStreamSegmentsRaw,
} = require('../general-stream-logic');

async function recordDownload({ initialSourceUrl, cookies, outputName }) {
  // get base stream source url
  const { resolvedSourceUrl } = await getResolvedSourceURL({ url: initialSourceUrl, cookies });

  // get direct stream url
  const { streamUrlBase, streamPathIndex } = await getStreamURL({
    url: resolvedSourceUrl,
    cookies,
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

module.exports = { recordDownload };
