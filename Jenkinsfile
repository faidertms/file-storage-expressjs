node {
    def testImage = 'tfilestorage-backend-test'
    def prodImage = 'thiagotms/tfilestorage-backend'
    def imageTag
    
    stage('preparation') { // for display purposes
        deleteDir()
        def git = checkout scm
        imageTag = "${BUILD_NUMBER}-${git.GIT_COMMIT}"
    }
    
    stage('build') {
        sh "docker build --target test --tag ${testImage} ."
        sh "docker build --target production --tag ${prodImage}:${imageTag} ."
    }
    
    stage('test') {
        sh "docker run --rm --name ${testImage} ${testImage}"
        sh "docker image rm ${testImage}"
    }
    
    stage('publish') {
        withCredentials([file(credentialsId: 'dockerhubpass', variable: 'password'), string(credentialsId: 'dockerhubuser', variable: 'user')]) {
            sh 'cat $password | docker login --username $user --password-stdin'
            sh "docker push thiagotms/tfilestorage-backend:${imageTag}"
            sh "docker image rm ${prodImage}:${imageTag}"
        }
    }
}
