const { request } = require('../../services');
const { debugLog } = require('../../util');

async function getLessons({ url, cookies: Cookie }) {
  debugLog('[~] Getting lessons');

  const response = await request({
    url,
    headers: {
      Cookie,
    },
  });

  debugLog('[~] Parsing lessons');

  // parse into inquirer list prompt format
  const body = await response.text();
  const lessons = [
    ...body.matchAll(/(?:_blank" href=")(.+?)(?:".+?)(?:>)((?:.|\P{M}\p{M}*)+?)(?:<.+?)/gu),
  ].map((match) => {
    const name = match[2].replace(/&nbsp;/g, ' ').replace(/(&amp;|&gt;|[^\w\d\sА-Яа-я-\.])/gu, '');
    const path = match[1];

    return {
      name: `[*] ${name}`,
      value: {
        name,
        path,
      },
    };
  });

  return { lessons };
}

module.exports = {
  getLessons,
};
