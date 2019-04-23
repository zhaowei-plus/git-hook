/**
 * commit-msg 钩子接收一个参数：存有当前提交信息的临时文件的路径
 *  
 */
function commitMsg(path) {
    console.log('commit-msg:', path);
}

console.log('commit-msg:', process.argv[1]);