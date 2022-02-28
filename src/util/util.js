const log = (p) => console.log(p);
const dir = (p) => console.dir(p, { depth: 10 });
const caesar = (str, shift) =>
  str
    .split('')
    .map((_) => String.fromCharCode(_.charCodeAt(0) + shift))
    .join('');

module.exports = {
  log,
  dir,
  caesar,
};
