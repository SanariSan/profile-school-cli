const { promptMode, promptURL, promptOutputName } = require('./prompts.direct');
const { recordDownload } = require('./record');
const { vodDownload } = require('./vod');
const { ECHOICE } = require('../../app.const');

// could be called directly or from navigation step
async function directDownload({ mode, initialSourceUrl, outputName, cookies }) {
  ({ mode } = await promptMode({ mode }));

  if (mode === ECHOICE.MAIN_MENU) return Promise.reject(ECHOICE.MAIN_MENU);

  ({ initialSourceUrl } = await promptURL({ initialSourceUrl, mode }));
  ({ outputName } = await promptOutputName({ outputName }));

  if (mode === ECHOICE.RECORD) return recordDownload({ initialSourceUrl, cookies, outputName });
  if (mode === ECHOICE.VOD) return vodDownload({ initialSourceUrl, cookies, outputName });
}

module.exports = {
  directDownload,
};
