const log = (p) => console.log(p);
const debugLog = (p) => (process.env.NODE_ENV === 'development' ? console.log(p) : false);
const dir = (p) => console.dir(p, { depth: 10 });
const debugDir = (p) =>
  process.env.NODE_ENV === 'development' ? console.dir(p, { depth: 10 }) : false;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rndInRange = (min = 0, max = min + 1) => Math.random() * (max - min) + min;
const clearScreen = () => process.stdout.write('\033c');
const makeEnum = (obj) => {
  const shallow = { ...obj };
  Object.entries(shallow).forEach(([key, value]) => (shallow[value] = key));

  return shallow;
};
const caesar = (str, shift) =>
  str
    .split('')
    .map((_) => String.fromCharCode(_.charCodeAt(0) + shift))
    .join('');

module.exports = {
  log,
  debugLog,
  dir,
  debugDir,
  sleep,
  rndInRange,
  clearScreen,
  makeEnum,
  caesar,
};
