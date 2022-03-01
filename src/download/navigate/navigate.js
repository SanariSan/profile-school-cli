const { prompt } = require('inquirer');
const { EURL } = require('../../app.const');
const { log } = require('../../util');
const { navigateCources } = require('./cources.navigate');
const { getResolvedCourceURL } = require('./get-resolved-cource-url.navigate');

async function navigate({ cookies }) {
  const { cources } = await navigateCources({ cookies });

  const { value: courcePath } = await prompt({
    type: 'list',
    message: `Choose cource`,
    choices: cources,
    name: 'value',
  });

  const { resolvedCourceUrl } = await getResolvedCourceURL({
    url: `${EURL.HOST}/${courcePath}`,
    cookies,
  });

  log(courcePath);
  log(resolvedCourceUrl);
}

module.exports = { navigate };
