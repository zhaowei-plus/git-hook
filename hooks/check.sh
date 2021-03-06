#!/bin/sh
# 利用 git diff 获取提交到暂存区的文件，过滤只获取 .vue .js 文件
STAGE_FILES=$(git diff --cached --name-only --diff-filter=ACM -- '*.vue' '*.js')

if test ${#STAGE_FILES} -gt 0
then
    echo '开始eslint检查'

    which eslint &> /dev/null
    if [[ "$?" == 1 ]]; then
        echo '没安装eslint'
        exit 1
    fi

    PASS=true

    for FILE in $STAGE_FILES
    do
        eslint $FILE
        if [[ "$?" == 1 ]]; then
      PASS=false
    fi
  done

  if ! $PASS; then
      echo "eslint检查没通过！"
      exit 1
  else
      echo "eslint检查完毕"
  fi

else
    echo '没有js文件需要检查'
    echo '11111111111-222222222222'
fi

exit 0