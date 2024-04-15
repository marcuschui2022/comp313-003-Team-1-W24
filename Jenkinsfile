pipeline {
    agent any
    tools {
        maven 'Maven 3.9.6'
    }
    environment {
        DOCKERHUB_PWD=credentials('DockerHub_Token')
    }
    stages {
        stage('Check out') {  
            steps {
                git branch: 'main', url: 'https://github.com/marcuschui2022/comp313-003-Team-1-W24'
            }
        }
        stage('Build Backend') {  
            steps {
                dir('FoodistaBackend') {  
                    // sh "mvn clean package"
                    sh "mvn -Dmaven.test.failure.ignore=true clean package"
                }
            }
        }
        stage('Code Analysis with SonarQube') {
            steps {
                dir('FoodistaBackend') {
                    sh "mvn sonar:sonar -Dsonar.projectKey=group12 -Dsonar.host.url=http://sonarqube:9000 -Dsonar.login=sqp_440d6ec5087e4d5df025cb3a020d00c15dca77a7"
                }
            }
        }
        stage('Code Test Coverage') {  
            steps {
                dir('FoodistaBackend') {  
                    sh "mvn test jacoco:report"
                }
            }
        }
        stage('Docker Login') {  // Docker login stage
            steps {
               sh "docker login -u marcusyuk -p ${DOCKERHUB_PWD}"
            }
        }
        stage('Deliver Stage - Docker Build & Push & Pull') { 
            steps {
                dir('FoodistaBackend') {  
                    sh "docker build -t marcusyuk/313-backend:${BUILD_NUMBER} ."
                    sh "docker push marcusyuk/313-backend:${BUILD_NUMBER}"
                    sh "docker pull marcusyuk/313-backend:${BUILD_NUMBER}"
                }
            }
        }
        stage('Deploy to Dev Env') {
            steps {
                echo "Deploying to Development Environment..."          
                sh "docker stop 313-backend-dev || true"
                sh "docker rm -f 313-backend-dev || true"
                sh "docker run -d --name 313-backend-dev -p 8081:8080 marcusyuk/313-backend:${BUILD_NUMBER}"
            }
        }
        stage('Deploy to QAT Env') {
            steps {
                echo "Deploying to Development Environment..."          
                sh "docker stop 313-backend-qat || true"
                sh "docker rm -f 313-backend-qat || true"
                sh "docker run -d --name 313-backend-qat -p 8082:8080 marcusyuk/313-backend:${BUILD_NUMBER}"
            }
        }
        stage('Deploy to Staging Env') {
            steps {
                echo "Deploying to Development Environment..."          
                sh "docker stop 313-backend-staging || true"
                sh "docker rm -f 313-backend-staging || true"
                sh "docker run -d --name 313-backend-staging -p 8083:8080 marcusyuk/313-backend:${BUILD_NUMBER}"
            }
        }
        stage('Deploy to Production Env') {
            steps {
                echo "Deploying to Development Environment..."          
                sh "docker stop 313-backend-prod || true"
                sh "docker rm -f 313-backend-prod || true"
                sh "docker run -d --name 313-backend-prod -p 3000:8080 marcusyuk/313-backend:${BUILD_NUMBER}"
            }
        }


    }

    post {
        success {
            dir('FoodistaBackend') {  
                jacoco(
                    execPattern: '**/target/jacoco.exec',
                    classPattern: '**/target/classes',
                    sourcePattern: '**/src/main/java'
                )
            }
        }
    }
}
