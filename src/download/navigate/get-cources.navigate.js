const { EURL } = require('../../app.const');
const { request } = require('../../services');
const { debugLog } = require('../../util');

async function getCources({ cookies: Cookie }) {
  debugLog('[~] Getting cources');

  const response = await request({
    url: EURL.COURCES,
    headers: {
      Cookie,
    },
  });

  debugLog('[~] Parsing cources');

  // parse into inquirer list prompt format
  const body = await response.text();
  const cources = [
    ...body.matchAll(
      /(?:offers__title-inner">)((?:.|\P{M}\p{M}*)+?)(?:<).+?(?:<\/div><a href=")(.+?)(?:")/gu,
    ),
  ].map((match) => ({
    name: `[*] ${match[1]
      .replace(/(&nbsp;)/g, ' ')
      .replace(/(&amp;|&gt;|[^\w\d\sА-Яа-я-\.])/gu, '')}`,
    value: match[2],
  }));

  return { cources };
}

module.exports = {
  getCources,
};
