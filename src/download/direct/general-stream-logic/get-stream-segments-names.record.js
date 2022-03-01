const { request } = require('../../../services');
const { log } = require('../../../util');
const { EERROR_NAME } = require('../../../app.const');

async function getStreamSegmentsNames({ url }) {
  log('[~] Getting segments names');

  const response = await request({ url });

  log('[~] Parse segments names');

  // in case of record it is just whole line file name
  // in case of vod it has "?" and ip after file name, so we cut that
  const matchedSegments = (await response.text()).match(/^[^#\s]+?(?=\?|$)/gm);
  if (matchedSegments === null) throw new Error(EERROR_NAME.NO_STREAM_SEGMENTS_NAMES);

  return {
    streamSegmentsNames: matchedSegments,
  };
}

module.exports = {
  getStreamSegmentsNames,
};
