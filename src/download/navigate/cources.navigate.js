const { EURL } = require('../../app.const');
const { request } = require('../../services');
const { log } = require('../../util');

async function navigateCources({ cookies: Cookie }) {
  log('[~] Loading cources');

  const response = await request({
    url: EURL.COURCES,
    headers: {
      Cookie,
    },
  });

  log('[~] Parsing cources');

  // parse into inquirer list prompt format
  const body = await response.text();
  const cources = [
    ...body.matchAll(/(?:offers__title-inner">)(.+?)(?:<).+?(?:<\/div><a href=")(.+?)(?:")/g),
  ].map((match) => ({
    name: match[1].replace(/&nbsp;/g, ' '),
    value: match[2],
  }));

  return { cources };
}

module.exports = {
  navigateCources,
};
