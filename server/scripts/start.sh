#!/bin/bash

# EC2 내 Spring Boot 실행 스크립트

# 서버가 실행중이면 프로세스 종료
ps -ef | grep "main_11-0.0.1-SNAPSHOT.jar" | grep -v grep | awk '{print $2}' | xargs kill -9 2> /dev/null

# 종료 이력 파악 후 적절한 문구 출력
if [ $? -eq 0 ];then
    echo "Successfully Stopped"
else
    echo "Application is Not Running"
fi

# 어플리케이션 재 실행
echo "Application Restarted!"
echo $1

# 어플리케이션 백그라운드 실행
nohup java -jar /root/main/back/build/libs/main_11-0.0.1-SNAPSHOT.jar > /dev/null 2>&1 &