#!/use/bin/env node

console.log(`
  pre-push 钩子在整个提交过程完成后运行。
  注：它不接收任何参数， 但你可以很容易地通过运行 git log - 1 HEAD 来获得最后一次的提交信息。
  该钩子一般用于通知之类的事情。
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