const { recordDownload } = require('./record');
const { vodDownload } = require('./vod');

async function download() {
  await recordDownload();
  // vodDownload();
}

module.exports = { download };
