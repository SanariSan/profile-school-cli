const { prompt } = require('inquirer');
const { EURL } = require('../../app.const');
const { readCookies } = require('../../cookies');
const { log } = require('../../util');
const { getResolvedSourceURL } = require('./get-resolved-source-url.record');
const { getStreamContentURL } = require('./get-stream-content-url.record');

async function recordDownload() {
  const unresolvedSourceUrl = (
    await prompt({
      message: `Type url`,
      type: 'input',
      name: 'value',
      default: EURL.RECORD_DEFAULT,
    })
  ).value;

  const cookies = readCookies();
  const resolvedSourceUrl = await getResolvedSourceURL({ unresolvedSourceUrl, cookies });
  const streamContentUrl = await getStreamContentURL({ resolvedSourceUrl, cookies });

  log(streamContentUrl);

  // get pieces amount
  // get pieces
  // clip pieces
  // remove pieces
}

module.exports = { recordDownload };
