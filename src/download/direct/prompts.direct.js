const { prompt } = require('inquirer');
const { ECHOICE, EURL } = require('../../app.const');

async function promptMode({ mode }) {
  if (mode !== undefined) return { mode };

  ({ value: mode } = await prompt({
    type: 'list',
    message: `Choose mode`,
    choices: [
      { name: '[#] Record', value: ECHOICE.RECORD },
      { name: '[#] VOD', value: ECHOICE.VOD },
      { name: '[#] Main menu', value: ECHOICE.MAIN_MENU },
    ],
    name: 'value',
  }));

  return { mode };
}

async function promptURL({ initialSourceUrl, mode }) {
  if (initialSourceUrl !== undefined) return { initialSourceUrl };

  ({ value: initialSourceUrl } = await prompt({
    message: `Type url`,
    type: 'input',
    name: 'value',
    default:
      mode === ECHOICE.RECORD ? EURL.RECORD_DEFAULT : mode === ECHOICE.VOD ? EURL.VOD_DEFAULT : '',
  }));

  return { initialSourceUrl };
}

async function promptOutputName({ outputName }) {
  if (outputName !== undefined) return { outputName };

  const date = new Date();
  ({ value: outputName } = await prompt({
    message: `Type output video name`,
    type: 'input',
    name: 'value',
    default: `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}___${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`,
  }));

  return { outputName };
}

module.exports = {
  promptMode,
  promptURL,
  promptOutputName,
};
