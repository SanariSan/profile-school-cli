const { prompt } = require('inquirer');
const { navigate } = require('./navigate');
const { directDownload } = require('./direct');
const { readCookies } = require('../cookies');
const { ECHOICE } = require('../app.const');

async function download() {
  const { value: mode } = await prompt({
    type: 'list',
    message: `Choose mode`,
    choices: [
      { name: 'Direct', value: ECHOICE.DIRECT },
      { name: 'Navigate', value: ECHOICE.NAVIGATE },
      { name: 'Main menu', value: ECHOICE.MAIN_MENU },
    ],
    name: 'value',
  });

  if (mode === ECHOICE.MAIN_MENU) return Promise.reject(ECHOICE.MAIN_MENU);

  const cookies = readCookies();

  if (mode === ECHOICE.DIRECT) {
    await directDownload({ cookies });
  }

  if (mode === ECHOICE.NAVIGATE) {
    await navigate({ cookies });
  }
}

module.exports = { download };
