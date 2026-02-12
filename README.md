docker build -f Dockerfile.jenkins -t my-jenkins-docker .


docker run -d --name jenkins   -p 8090:8080 -p 50000:50000   -v jenkins_home:/var/jenkins_home   -v /var/run/docker.sock:/var/run/docker.sock   --user root   my-jenkins


docker compose up -d 

jenkins build (via navigateur)



minikube start --driver=docker


kubectl apply -f k8s/



