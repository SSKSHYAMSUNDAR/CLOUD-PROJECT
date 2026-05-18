
pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t student-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker rm -f student-app-container || true'
                sh 'docker run -d -p 80:80 --name student-app-container student-app'
            }
        }

    }
}

