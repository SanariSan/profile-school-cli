const { debugLog, sleep, rndInRange } = require('../../../util');
const { request } = require('../../../services');
const { ETIME_SEC } = require('../../../app.const');

async function getStreamSegmentRaw({ url, segment, progressTracker }) {
  debugLog(`[~] Getting segment [${segment}]`);

  const response = await request({ url: `${url}/${segment}` });

  return response.arrayBuffer().then((_) => {
    debugLog(`[+] Got ${segment}`);

    progressTracker.updateDownloaded();
    return new Uint8Array(_);
  });
}

async function getStreamSegmentsRaw({ url, segments, progressTracker }) {
  debugLog(`[~] Getting segments [${segments.length} pcs.]`);

  // send requests with a little delay to not get blocked
  let delayAccumulator = 0;
  const segmentsRaw = segments.map((segment) =>
    sleep((delayAccumulator += rndInRange(0, 1) * ETIME_SEC.HALF)).then(() =>
      getStreamSegmentRaw({ url, segment, progressTracker }),
    ),
  );

  return { segmentsRaw };
}

module.exports = {
  getStreamSegmentsRaw,
};
