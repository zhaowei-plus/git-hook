const fs = require('fs');
const path = require('path');
const debug = require('debug')('app:config:test');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

function checkTestFile() {
    const source = resolve('src');
    const test = resolve('test');

    const files = fs.readdirSync(source);
    files.forEach(function(file) {
        if (file !== 'index.js') {
            const testFile = resolve(`test/${file}`);
            if (!fs.existsSync(testFile)) {
                debug(`${file} 没有对应的同名测试文件,请添加对应测试用例文件`);
                process.exit(1);
            }
        }
    });
}

function checkTestResult() {
    checkTestFile();

    const exec = require('child_process').execSync;
    const testResult = exec('npm run test');
    if (testResult.includes('FAILED')) {
        debug('测试用例未全部通过,不能继续执行');
        process.exit(1);
    } else {
        debug('测试用例全部通过');
        process.exit(0);
    }
}


module.exports = function generateTest() {
    checkTestResult();
}