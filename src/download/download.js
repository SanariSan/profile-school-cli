const { prompt } = require('inquirer');
const { navigate } = require('./navigate');
const { directDownload } = require('./direct');
const { readCookies } = require('../cookies');
const { ECHOICE } = require('../app.const');
const { debugDir } = require('../util');

async function download() {
  const { value: mode } = await prompt({
    type: 'list',
    message: `Choose mode`,
    choices: [
      { name: '[#] Navigate', value: ECHOICE.NAVIGATE },
      { name: '[#] Direct', value: ECHOICE.DIRECT },
      { name: '[#] Main menu', value: ECHOICE.MAIN_MENU },
    ],
    name: 'value',
  });

  if (mode === ECHOICE.MAIN_MENU) return Promise.reject(ECHOICE.MAIN_MENU);

  const { cookies } = readCookies();
  debugDir(cookies);

  if (mode === ECHOICE.DIRECT) {
    await directDownload({ cookies });
  }

  if (mode === ECHOICE.NAVIGATE) {
    await navigate({ cookies });
  }
}

module.exports = { download };
