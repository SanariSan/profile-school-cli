const { createWriteStream } = require('fs');
const { EPATH } = require('../../../app.const');
const { log } = require('../../../util');

async function clipSegments({ segmentsRaw, outputName }) {
  log('[~] Clipping segments when downloaded');

  const ws = createWriteStream(`${EPATH.OUTPUT}/${outputName}.ts`, {
    autoClose: false,
  });

  let i = 1;
  for (let segmentRaw of segmentsRaw) {
    ws.write(await segmentRaw);
    log(`[+] Clipped [#${i++}]`);
  }

  ws.end();
  ws.close();
}

module.exports = {
  clipSegments,
};
