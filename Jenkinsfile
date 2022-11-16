<<<<<<< HEAD
=======
def ssh_publisher(SERVER_CONFIG) {
    sshPublisher(
        continueOnError: false,
        failOnError: true,
        publishers:[
            sshPublisherDesc(
                configName: "${SERVER_CONFIG}",
                verbose: true,
                transfers: [
                    // (5.1) Copy script files
                    sshTransfer(
                        sourceFiles: "deploy/develop/script/*.sh",
                        removePrefix: "deploy/develop/script",
                        remoteDirectory: "build/script"
                    ),
                    // (5.2) Copy build files
                    sshTransfer(
                        sourceFiles: "build/libs/*.jar",
                        removePrefix: "build/libs",
                        remoteDirectory: "/build/lib",
                        // Absolute path.
                        execCommand: "sh /home/build/script/deploy_server.sh"
                    ),
                    // (5.3) Health check
					sshTransfer(
                    	// Absolute path.
                        execCommand: "sh /home/build/script/health_check.sh"
                    )
                ]
            )
        ]
    )
}

>>>>>>> 32df3e932f5033eef372ab7533fda0b9ae0bad81
pipeline{
    agent any
    environment {
       BACK_CONTAINER_NAME="mylittlesnowball_back_container"
       BACK_NAME = "mylittlesnowball_back"

       FRONT_CONTAINER_NAME="mylittlesnowball_front_container"
       FRONT_NAME = "mylittlesnowball_front"
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
