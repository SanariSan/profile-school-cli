const { log, debugDir } = require('../../../util');
const { clipSegments } = require('./clip-segments.general-stream-logic');
const { getStreamSegmentsNames } = require('./get-stream-segments-names.general-stream-logic');
const { getStreamSegmentsPath } = require('./get-stream-segments-path.general-stream-logic');
const { getStreamSegmentsRaw } = require('./get-stream-segments-raw.general-stream-logic');
const { ProgressTracker } = require('./progress.general-stream-logic');

async function generalStreamDownloadProcess({ streamUrlBase, streamPathIndex, outputName }) {
  // get path for segments names grab
  const { streamSegmentsPathBase, streamSegmentsPathSource } = await getStreamSegmentsPath({
    url: `${streamUrlBase}/${streamPathIndex}`,
  });
  debugDir({ streamSegmentsPathBase, streamSegmentsPathSource });

  // get segments names
  const { streamSegmentsNames } = await getStreamSegmentsNames({
    url: `${streamUrlBase}/${streamSegmentsPathBase}/${streamSegmentsPathSource}`,
  });
  debugDir({ streamSegmentsNames });

  log('');
  const progressTracker = new ProgressTracker({ total: streamSegmentsNames.length });

  // get array of promises with segments and immediately go to the next step of clipping
  const { segmentsRaw } = await getStreamSegmentsRaw({
    url: `${streamUrlBase}/${streamSegmentsPathBase}`,
    segments: streamSegmentsNames,
    progressTracker,
  });
  debugDir({ segmentsRaw });

  // clip segments as they being downloaded
  await clipSegments({ segmentsRaw, outputName });
}

module.exports = {
  generalStreamDownloadProcess,
};
