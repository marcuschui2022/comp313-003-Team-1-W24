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
        stage('check file') {
            steps {
                dir('FoodistaBackend') {  
                    sh "ls"
                    sh "cd target"
                    sh "ls"
                }
            }
        }
        stage('Run Application') {
            steps {
                dir('FoodistaBackend') {  
                    sh "java -jar target/FoodistaBackend-0.0.1-SNAPSHOT.jar"
                }
            }
        }
        // stage('Test Application') {
        //     steps {
        //         dir('FoodistaBackend') {  
        //             sh "sleep 10"
        //             sh 'curl -X GET http://localhost:8084/'
        //         }
        //     }
        // }
        // stage('Code Coverage for Backend') {  
        //     steps {
        //         dir('FoodistaBackend') {  
        //             sh "mvn test jacoco:report"
        //         }
        //     }
        // }
    }

    // post {
    //     success {
    //         dir('FoodistaBackend') {  
    //             jacoco(
    //                 execPattern: '**/target/jacoco.exec',
    //                 classPattern: '**/target/classes',
    //                 sourcePattern: '**/src/main/java'
    //             )
    //         }
    //     }
    // }
}
