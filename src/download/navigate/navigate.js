const { prompt } = require('inquirer');
const { EURL, ECHOICE } = require('../../app.const');
const { getCources } = require('./get-cources.navigate');
const { getResolvedCourceURL } = require('./get-resolved-cource-url.navigate');
const { getLessons } = require('./get-lessons.navigate');
const { directDownload } = require('../direct');

async function navigate({ cookies }) {
  const { cources } = await getCources({ cookies });

  // add main menu as first option
  cources.unshift({
    name: '[#] Main menu',
    value: ECHOICE.MAIN_MENU,
  });

  const { value: courcePath } = await prompt({
    type: 'list',
    message: `Choose cource`,
    choices: cources,
    name: 'value',
  });

  if (courcePath === ECHOICE.MAIN_MENU) {
    return Promise.reject(ECHOICE.MAIN_MENU);
  }

  const { resolvedCourceUrl } = await getResolvedCourceURL({
    url: `${EURL.HOST}/${courcePath}`,
    cookies,
  });

  const { lessons } = await getLessons({
    url: resolvedCourceUrl,
    cookies,
  });

  // add main menu as first option
  lessons.unshift({
    name: '[#] Main menu',
    value: ECHOICE.MAIN_MENU,
  });

  // get { name, path } of lesson
  const { value: lessonEntity } = await prompt({
    type: 'list',
    message: `Choose lesson`,
    choices: lessons,
    name: 'value',
  });

  if (lessonEntity === ECHOICE.MAIN_MENU) {
    return Promise.reject(ECHOICE.MAIN_MENU);
  }

  // explicit VOD mode check 'view_archive'
  await directDownload({
    cookies,
    initialSourceUrl: `${EURL.HOST}/${lessonEntity.path}`,
    outputName: lessonEntity.name,
    mode: lessonEntity.path.includes('lesson_video') ? ECHOICE.RECORD : ECHOICE.VOD,
  });
}

module.exports = { navigate };
