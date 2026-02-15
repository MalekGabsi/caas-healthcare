# 🏥 Mini-Projet CaaS -- Plateforme Healthcare Microservices

## 📌 Présentation Générale

Ce projet met en place une architecture **microservices** complète pour
la gestion des patients et des rendez-vous médicaux.

:

-   GitHub (gestion du code)
-   Docker (conteneurisation)
-   Jenkins (intégration continue)
-   Kubernetes / Minikube (orchestration)
-   Prometheus & Grafana (monitoring)

------------------------------------------------------------------------

# 🧱 Architecture de l'Application

L'application est composée de :

-   **Frontend** (React + Vite)
-   **API Gateway** (Express)
-   **Patient Service**
-   **Appointment Service**
-   **MongoDB**
-   **Jenkins**
-   **Cluster Kubernetes (Minikube)**

------------------------------------------------------------------------

# 1️⃣ Cloner le projet

``` bash
git clone https://github.com/MalekGabsi/caas-healthcare
cd caas-healthcare
```

------------------------------------------------------------------------

# 2️⃣ Dockerisation

## 🔨 Construction de l'image Jenkins personnalisée

``` bash
docker build -f Dockerfile.jenkins -t my-jenkins-docker .
```

## 🚀 Lancer Jenkins

``` bash
docker run -d   --name jenkins   -p 8090:8080   -p 50000:50000   -v jenkins_home:/var/jenkins_home   -v /var/run/docker.sock:/var/run/docker.sock   --user root   my-jenkins-docker
```

Accès Jenkins : http://localhost:8090

------------------------------------------------------------------------

# 3️⃣ Lancer l'application en local (Docker Compose)

``` bash
docker compose up -d
```

Services disponibles :

-   Frontend → http://localhost:5173
-   API Gateway → http://localhost:4000

------------------------------------------------------------------------

# 4️⃣ Pipeline Jenkins (CI/CD)

La pipeline effectue :

1.  Checkout du code depuis GitHub
2.  Build des images Docker
3.  Push vers Docker Hub

Images construites :

-   gabsiuuu/caas-healthcare-api-gateway
-   gabsiuuu/caas-healthcare-patient
-   gabsiuuu/caas-healthcare-appointment
-   gabsiuuu/caas-healthcare-frontend

------------------------------------------------------------------------

# 5️⃣ Déploiement Kubernetes (Minikube)

## Démarrer Minikube

``` bash
minikube start --driver=docker
```

## Déployer les objets Kubernetes

``` bash
kubectl apply -f k8s/
```

## Vérifier les pods

``` bash
kubectl get pods
kubectl get services
```

## Accéder au frontend

``` bash
minikube service frontend --url
```

------------------------------------------------------------------------

## 🔄 Mettre à jour après un nouveau build

``` bash
kubectl rollout restart deployment frontend
kubectl rollout restart deployment api-gateway
kubectl rollout restart deployment patient-service
kubectl rollout restart deployment appointment-service
```

------------------------------------------------------------------------

# 6️⃣ Monitoring avec Prometheus & Grafana

## Ajouter le repository Helm

``` bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

## Créer le namespace

``` bash
kubectl create namespace monitoring
```

## Installer la stack monitoring

``` bash
helm install monitoring prometheus-community/kube-prometheus-stack   --namespace monitoring
```

## Vérifier les pods

``` bash
kubectl get pods -n monitoring
```

------------------------------------------------------------------------

## Accéder à Prometheus

``` bash
kubectl port-forward -n monitoring svc/monitoring-kube-prometheus-prometheus 9090:9090
```

http://localhost:9090

Exemples de requêtes :

``` promql
sum(rate(container_cpu_usage_seconds_total[5m])) by (pod)
count(kube_node_info)
```

------------------------------------------------------------------------

## Accéder à Grafana

``` bash
kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80
```

http://localhost:3000

------------------------------------------------------------------------

# 🎯 Objectifs DevOps Atteints

✔ Architecture microservices\
✔ Dockerisation complète\
✔ Pipeline CI Jenkins\
✔ Déploiement Kubernetes\
✔ Monitoring Prometheus & Grafana

------------------------------------------------------------------------

# 📦 Commandes Principales Résumées

``` bash
docker compose up -d
docker build -f Dockerfile.jenkins -t my-jenkins-docker .
minikube start --driver=docker
kubectl apply -f k8s/
kubectl rollout restart deployment frontend
minikube service frontend --url
```