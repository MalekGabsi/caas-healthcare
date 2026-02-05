pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'ton_dockerhub_username'
    IMAGE_PREFIX = 'caas-healthcare'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
        url: 'https://github.com/MalekGabsi/caas-healthcare'
      }
    }

    stage('Build Images') {
      steps {
        sh '''
        docker build -t $DOCKERHUB_USER/$IMAGE_PREFIX-api-gateway backend/api-gateway
        docker build -t $DOCKERHUB_USER/$IMAGE_PREFIX-patient backend/patient-service
        docker build -t $DOCKERHUB_USER/$IMAGE_PREFIX-appointment backend/appointment-service
        docker build -t $DOCKERHUB_USER/$IMAGE_PREFIX-frontend frontend
        '''
      }
    }

    stage('Push Images') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'USER',
          passwordVariable: 'PASS'
        )]) {
          sh '''
          echo "$PASS" | docker login -u "$USER" --password-stdin
          docker push $DOCKERHUB_USER/$IMAGE_PREFIX-api-gateway
          docker push $DOCKERHUB_USER/$IMAGE_PREFIX-patient
          docker push $DOCKERHUB_USER/$IMAGE_PREFIX-appointment
          docker push $DOCKERHUB_USER/$IMAGE_PREFIX-frontend
          '''
        }
      }
    }
  }
}
