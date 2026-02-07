
---

# 📄 4. `todo-app-ci-cd-minikube.md`

```markdown
# 🔄 CI/CD Pipeline for Todo App on Kubernetes (Minikube)

## 📌 Introduction

CI/CD (Continuous Integration and Continuous Deployment) automates testing and deployment of applications.

This guide explains how to create a simple CI/CD workflow for deploying a Todo app to Minikube.

---

## 🎯 Objectives

- Automate Docker image build
- Push image to registry
- Deploy to Kubernetes
- Validate deployment

---

## 🧩 CI/CD Workflow Steps

1. Developer pushes code to GitHub
2. CI builds Docker image
3. Image pushed to Docker Hub
4. Kubernetes deployment updated
5. App deployed automatically

---

## 🐳 Example GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Todo App CI/CD

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Build Docker image
      run: docker build -t todo-app:latest .

    - name: Deploy to Minikube
      run: kubectl apply -f deployment.yaml
