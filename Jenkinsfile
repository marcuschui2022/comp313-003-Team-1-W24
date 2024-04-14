pipeline {
    agent any
    tools {
        maven 'Maven 3.9.6'
    }
    // environment {
    // }
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
                    sh "mvn sonar:sonar -Dsonar.projectKey=sqp_a471f83e1b4610aaadb0f9c8583aae78fe669ebf -Dsonar.host.url=http://host.docker.internal:9000"
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
