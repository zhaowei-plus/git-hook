#!/use/bin/env node

const fs = require('fs');

console.log(`
  commit-msg 钩子接收一个参数，此参数即上文提到的，存有当前提交信息的临时文件的路径。 
  如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。
`);

const filePath = process.argv[1];
console.log(`当前提交文件：${filePath}`);

if (filePath.indexOf('commit-msg.js') > -1) {
  console.warn('commit-msg.js 被限制提交');
  // process.exit(1)
}

process.exit(0)