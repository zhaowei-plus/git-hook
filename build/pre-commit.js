#!/use/bin/env node

console.log(`
  pre-commit 钩子在键入提交信息前运行。
  注：它用于检查即将提交的快照， 例如， 检查是否有所遗漏， 确保测试运行， 以及核查代码。 
  如果该钩子以非零值退出， Git 将放弃此次提交， 不过你可以用 git commit--no - verify 
  来绕过这个环节。 你可以利用该钩子， 来检查代码风格是否一致（ 运行类似 lint 的程序）、 
  尾随空白字符是否存在（ 自带的钩子就是这么做的）， 或新方法的文档是否适当
`);

const child_process = require('child_process');

const {
    exec,
} = child_process;

exec('git log -1 HEAD', (err, info) => {
    if (err) {
        console.error('error:', err);
    }

    console.log('info:', info);
});