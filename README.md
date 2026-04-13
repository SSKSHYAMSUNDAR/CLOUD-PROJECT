# 🚀 DevOps Project Report: Automated CI/CD Pipeline for Student Application on AWS

**Author:** SHYAM SUNDAR S
**Date:** April 2026

---

# 📑 Table of Contents

1. Project Overview
2. Architecture Diagram
3. Step 1: AWS EC2 Instance Preparation
4. Step 2: Install Dependencies on EC2
5. Step 3: Application Setup
6. Step 4: GitHub Repository Configuration
7. Step 5: Jenkins CI/CD Pipeline
8. Step 6: Deployment Verification
9. Conclusion
10. Infrastructure Diagram
11. Workflow Diagram

---

# 1️⃣ Project Overview

This project demonstrates the deployment of a **Node.js-based student data entry application** on AWS. The application allows users to input student details through a web interface and stores the data in **AWS DynamoDB**.

A complete **CI/CD pipeline** is implemented using Jenkins to automate the build and deployment process whenever code is pushed to GitHub.

---

# 2️⃣ Architecture Diagram

![Architecture Diagram](architecture.png)

### 🔍 Description

* Developer pushes code to GitHub
* Jenkins pipeline is triggered automatically
* Jenkins builds Docker image and deploys application
* Application runs on EC2
* Data is stored in DynamoDB

---

# 3️⃣ Step 1: AWS EC2 Instance Preparation

### Launch EC2 Instance

* OS: Amazon Linux 2023
* Instance Type: t2.micro
* Create key pair

### Configure Security Group

* Port 22 → SSH
* Port 80 → HTTP
* Port 8080 → Jenkins

### Connect to EC2

```bash
ssh -i key.pem ec2-user@<EC2-Public-IP>
```

---

# 4️⃣ Step 2: Install Dependencies on EC2

```bash
sudo dnf update -y

curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs git docker

sudo systemctl start docker
sudo systemctl enable docker

sudo usermod -aG docker ec2-user
newgrp docker
```

---

# 5️⃣ Step 3: Application Setup

### Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/student-devops-app.git
cd student-devops-app
```

### Install Dependencies

```bash
npm install
```

### Allow Port 80 Access

```bash
sudo setcap 'cap_net_bind_service=+ep' $(which node)
```

### Run Application

```bash
node app.js
```

---

# 6️⃣ Step 4: GitHub Repository Configuration

### Dockerfile

```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "app.js"]
```

### docker-compose.yml

```yaml
version: "3"
services:
  app:
    build: .
    ports:
      - "80:80"
```

### Jenkinsfile

```groovy
pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/YOUR-USERNAME/student-devops-app.git'
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t student-app .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 80:80 student-app'
            }
        }
    }
}
```

---

# 7️⃣ Step 5: Jenkins CI/CD Pipeline

### Install Jenkins

```bash
sudo dnf install java-17-amazon-corretto -y
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo dnf install jenkins -y
```

### Start Jenkins

```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### Access Jenkins

```
http://<EC2-Public-IP>:8080
```

### Create Pipeline

* New Item → Pipeline
* Configure GitHub repo
* Script Path: Jenkinsfile

---

# 8️⃣ Step 6: Deployment Verification

```bash
docker ps
```

Open:

```
http://<EC2-Public-IP>
```

---

# 9️⃣ Conclusion

This project successfully demonstrates a **complete DevOps pipeline**, integrating development, automation, and deployment.

It ensures:

* Faster deployments
* Reduced manual effort
* Scalable cloud architecture

---

# 🔟 Infrastructure Diagram

```
User → EC2 (Node.js App) → DynamoDB
             ↑
         Jenkins CI/CD
             ↑
          GitHub
```

---

# 1️⃣1️⃣ Workflow Diagram

```
Developer → GitHub → Jenkins
        → Build Docker Image
        → Deploy to EC2
        → Application Live
```

---

## 👨‍💻 Author

SHYAM SUNDAR S
