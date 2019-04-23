const fs = require('fs');
const path = require('path');
const debug = require('debug')('app:config:test');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

function checkTestFile() {
    const source = resolve('src');

    console.log('source:', source);

    const files = fs.readdirSync(source);

    console.log('files:', files);

    files.forEach(function(file) {
        if (file !== 'index.js') {
            const testFile = resolve(`test/${file}`);
            console.log('testFile:', testFile, fs.existsSync(testFile));
            if (!fs.existsSync(testFile)) {
                console.log(`${file} 没有对应的同名测试文件,请添加对应测试用例文件`);
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

checkTestResult();