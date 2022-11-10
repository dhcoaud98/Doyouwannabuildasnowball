pipeline{
    agent any
    environment {
       BACK_CONTAINER_NAME="back_container"
       BACK_NAME = "back"

       FRONT_CONTAINER_NAME="front_container"
       FRONT_NAME = "front"
    }
    stages {
        stage('Clean'){
            steps{
                script {
                    try{
                        sh "docker stop ${BACK_CONTAINER_NAME}"

                        sleep 1
                        sh "docker rm ${BACK_CONTAINER_NAME}"

                        sh "docker stop ${FRONT_CONTAINER_NAME}"
                        sleep 1
                        sh "docker rm ${FRONT_CONTAINER_NAME}"
                    }catch(e){
                        sh 'exit 0'
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script{
                    sh "docker build -t ${BACK_NAME} ./backend/."
	        sh "docker build -t ${FRONT_NAME} ./frontend/."

                }
            }
        }

        stage('Deploy'){
            steps {
                sh "docker run -d --name=${BACK_CONTAINER_NAME} -p 8080:8080 ${BACK_NAME}"
                sh "docker run -d --name=${FRONT_CONTAINER_NAME} -p 3000:80 ${FRONT_NAME}"
            }
        }
        stage('Docker run') {
            steps {
                sh "docker image prune --force"
            }
        }
    }
}
