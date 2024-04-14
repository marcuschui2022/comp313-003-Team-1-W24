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
                    sh "mvn clean package"
                }
            }
        }
        stage('Code Coverage for Backend') {  
            steps {
                dir('FoodistaBackend') {  
                    sh "mvn test jacoco:report"
                }
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
