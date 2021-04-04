#!/bin/bash
WORK_PATH='/usr/projects/vue-back'
cd $WORK_PATH
echo "先清除老代码"
git reset --hard origin/main
git clean -f
echo "拉取最新代码"
git branch -M main
git pull origin main
echo "编译"
npm run build
echo "开始执行构建"
docker build -t vue-fond:1.0 .
echo "停止旧容器并删除旧容器"
docker stop vue-fond-container
docker rm vue-fond-container
echo "启动新容器"
docker container run -p 80:80  --name vue-fond-container -d vue-fond:1.0
