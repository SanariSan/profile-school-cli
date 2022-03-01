// for compiled app
require('dotenv').config();
const { prompt } = require('inquirer');
const { ECHOICE } = require('./app.const');
const { download } = require('./download');
const { renewCookies } = require('./cookies');
const { log } = require('./util');
const { handle } = require('./error');

async function init() {
  log('----------------');

  const { value: mode } = await prompt({
    type: 'list',
    message: `Choose mode`,
    choices: [
      { name: 'Download', value: ECHOICE.DOWNLOAD },
      { name: 'Renew cookies', value: ECHOICE.RENEW_COOKIES },
    ],
    name: 'value',
  });

  if (mode === ECHOICE.RENEW_COOKIES) {
    void renewCookies()
      .then(() => log('[+] Cookies have been updated!'))
      .catch((e) => {
        handle(e);
      })
      .finally(init);
  }

  if (mode === ECHOICE.DOWNLOAD) {
    void download()
      .then(() => log('[+] File has been downloaded!'))
      .catch((e) => {
        if (e === ECHOICE.MAIN_MENU) return;
        handle(e);
      })
      .finally(init);
  }
}

init();
