const { createWriteStream, existsSync, mkdirSync } = require('fs');
const { EPATH } = require('../../../app.const');
const { debugLog } = require('../../../util');

async function clipSegments({ segmentsRaw, outputName }) {
  debugLog('[~] Clipping segments when downloaded');

  if (!existsSync(EPATH.OUTPUT)) {
    mkdirSync(EPATH.OUTPUT);
  }

  const ws = createWriteStream(`${EPATH.OUTPUT}/${outputName}.ts`, {
    autoClose: false,
  });

  let i = 1;
  for (let segmentRaw of segmentsRaw) {
    ws.write(await segmentRaw);
    debugLog(`[+] Clipped [#${i++}]`);
  }

  ws.end();
  ws.close();
}

module.exports = {
  clipSegments,
};
