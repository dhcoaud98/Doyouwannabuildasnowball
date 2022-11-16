# (1)
REPOSITORY=/home
BUILD_PATH=$(ls -tr ${REPOSITORY}/build/lib/*.jar | tail -1)
JAR_NAME=$(basename $BUILD_PATH)
echo "> build file: $JAR_NAME"

# (2)
echo "> copy build file"
DEPLOY_PATH=${REPOSITORY}/deploy/
if [ ! -d $DEPLOY_PATH ]; then
  mkdir $DEPLOY_PATH
fi

cp $BUILD_PATH $DEPLOY_PATH

echo "> change file name"
CP_JAR_PATH=$DEPLOY_PATH$JAR_NAME
APPLICATION_JAR_NAME=application-deploy.jar
APPLICATION_JAR=$DEPLOY_PATH$APPLICATION_JAR_NAME

echo "> create link"
ln -Tfs $CP_JAR_PATH $APPLICATION_JAR

# (3)
echo "> Check application PID."
CURRENT_PID=$(pgrep -f -n $APPLICATION_JAR_NAME)
echo "$CURRENT_PID"

if [ -z $CURRENT_PID ];
  then
    echo "> No running applications found."
else
	echo "> kill -9 $CURRENT_PID"
	kill -9 $CURRENT_PID
	sleep 10
fi

# (4)
echo "> Run application."
nohup java -jar -Dspring.profiles.active=local $APPLICATION_JAR > /dev/null 2> /dev/null < /dev/null &