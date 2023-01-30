#!/bin/bash
BUILD_JAR=$(ls /root/main/back/build/libs/seb41_main_11-0.0.1-SNAPSHOT.jar)
JAR_NAME=seb41_main_11-0.0.1-SNAPSHOT

echo "> 현재 시간: $(date)" >> /root/main/back/log/deploy.log

echo "> build 파일명: $JAR_NAME" >> /root/main/back/log/deploy.log

echo "> build 파일 복사" >> /root/main/back/log/deploy.log
DEPLOY_PATH=/root/main/back/build/libs
cp $BUILD_JAR $DEPLOY_PATH

echo "> 현재 실행중인 애플리케이션 pid 확인" >> /root/main/back/log/deploy.log
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> /root/main/back/log/deploy.log
else
  echo "> kill -9 $CURRENT_PID" >> /root/main/back/log/deploy.log
  sudo kill -9 $CURRENT_PID
  sleep 5
fi

DEPLOY_JAR=$BUILD_JAR
    echo "> DEPLOY_JAR 배포"    >> /root/main/back/log/deploy.log
    cd /root/main/back/log/build/libs
    sudo nohup java -jar -Dspring.profiles.active=local $DEPLOY_JAR >> /root/main/back/log/deploy.log 2>/root/main/back/log/deploy_err.log &