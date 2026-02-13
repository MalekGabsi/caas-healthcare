docker build -f Dockerfile.jenkins -t my-jenkins-docker .


docker run -d --name jenkins   -p 8090:8080 -p 50000:50000   -v jenkins_home:/var/jenkins_home   -v /var/run/docker.sock:/var/run/docker.sock   --user root   my-jenkins


docker compose up -d 

jenkins build (via navigateur)



k8s()

minikube start --driver=docker


kubectl apply -f k8s/

kubectl rollout restart deployment frontend

minikube service frontend --url


Monitoring 

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update


kubectl create namespace monitoring

helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring


kubectl get pods -n monitoring


kubectl port-forward -n monitoring svc/monitoring-kube-prometheus-prometheus 9090:9090
sum(rate(container_cpu_usage_seconds_total{namespace="monitoring"}[5m])) by (pod)
count(kube_node_info)


kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80

http://localhost:3000








