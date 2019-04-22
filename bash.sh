#!/bin/bash

echo 'bash test'

# 如果在commit时有未添加到暂存区的文件，拒绝提交
diff = $(git diff)
if [[ $diff !=0 ]];then
  echo "some files is changed but not add to stash, git commit denied"
  exit 1
fi

# 读取git暂存区的.js 和 .vue文件
files = $(git diff --cached --name-only | grep -E '\.js$|\.vue$')

# 在控制台打印文件列表
echo $files
# Prevent ESLint help message if no files matched

# 如果文件列表为空，退出执行环境，继续执行commit操作
if [[ $files = "" ]] ; then
    exit 0
fi

failed = 0

# 循环文件列表
for file in ${files}; do
    # 判断文件是否存在(-e 表示 exists)
    if [ ! -e $file ] ; then
        continue
    fi
    
    # 在控制台打印该文件的eslint检验结果，如果通过，则返回空
    git show :$file | ./node_modules/.bin/eslint $file --color --fix
    
    # 文件未通过eslint检验，标记为失败
    if [[ $? != 0 ]] ; then
        failed=1
    fi
done;

# 有文件未通过检验，退出执行环境，中断commit操作
if [[ $failed != 0 ]] ; then
    echo "❌  ESLint failed, git commit denied"
    exit $failed
fi