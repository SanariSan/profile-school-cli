const { log } = require('../../../util');
const { request } = require('../../../services');
const { EERROR_NAME } = require('../../../app.const');

async function getStreamSegmentsPath({ url }) {
  log('[~] Get segments path');

  const response = await request({ url });

  log('[~] Parse segments path');

  const matchedPath = (await response.text()).match(/^[^#\s]+/m);
  if (matchedPath === null) throw new Error(EERROR_NAME.NO_STREAM_SEGMENTS_PATH);

  const p = matchedPath[0];

  return {
    streamSegmentsPathBase: p.slice(0, p.lastIndexOf('/')),
    streamSegmentsPathSource: p.slice(
      p.lastIndexOf('/') + 1,
      // if path contains "?", then slice up to it (has ip after)
      p.includes('?') ? p.lastIndexOf('?') : p.length,
    ),
  };
}

module.exports = {
  getStreamSegmentsPath,
};
