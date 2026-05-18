
pipeline {
    agent any

    stage('Clone') {
    steps {
        git 'https://github.com/SSKSHYAMSUNDAR/CLOUD-PROJECT.git'
         }
      }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t student-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 80:80 student-app'
            }
        }
    }
}
