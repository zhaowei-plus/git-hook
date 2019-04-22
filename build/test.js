const exec = require('child_process').execSync;
const pwd = exec('pwd');
console.log(pwd.toString('utf8').trim());