// for compiled app
require('dotenv').config();
const { prompt } = require('inquirer');
const { ECHOICE } = require('./app.const');
const { download } = require('./download');
const { renewCookies } = require('./renew-cookies');
const { log } = require('./util');

async function init() {
  const mode = (
    await prompt({
      type: 'list',
      message: `Choose mode`,
      choices: [
        { name: 'Download', value: ECHOICE.DOWNLOAD },
        { name: 'Renew cookies', value: ECHOICE.RENEW_COOKIES },
      ],
      name: 'value',
    })
  ).value;

  if (mode === ECHOICE.RENEW_COOKIES) {
    void renewCookies()
      .then(() => log('[+] Cookies have been updated!\n'))
      .then(init)
      .catch((e) => {
        log(e);
      });
  }

  if (mode === ECHOICE.DOWNLOAD) {
    void download()
      .then(() => log('File has been downloaded!\n'))
      .then(init)
      .catch((e) => {
        log(e);
      });
  }
}

init();
