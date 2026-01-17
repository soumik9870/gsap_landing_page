# 🚀 Production Deployment – GSAP Landing Page

> **Repository:** <https://github.com/soumik9870/gsap%5Flanding%5Fpage>
> 
> **Live URL:** [https://lazydev.store](https://lazydev.store/)

---

## 🧭 Overview

This document describes the **end-to-end production deployment pipeline** for the GSAP Landing Page project. The setup follows **real-world DevOps practices** including CI/CD, Dockerized builds, zero-downtime deployment, HTTPS, reverse proxying, health checks, and security hardening.

This is **not a demo setup** — it is a production-grade deployment tested against real failures (DNS issues, HTTPS validation, 502 errors, ISP caching).

---

## 🧱 System Architecture

```
┌────────────┐
│ Developer  │
└─────┬──────┘
      │ git push
      ▼
┌──────────────┐
│ GitHub Repo  │
│ (main)       │
└─────┬────────┘
      │ GitHub Actions (CI)
      ▼
┌──────────────┐
│ Docker Hub   │
│ Image Repo   │
└─────┬────────┘
      │ docker pull
      ▼
┌────────────────────────────┐
│ AWS EC2 (Ubuntu)            │
│ ├─ Docker Container         │
│ ├─ Nginx (Reverse Proxy)    │
│ └─ Certbot (HTTPS)          │
└─────┬──────────────────────┘
      │ HTTPS
      ▼
┌──────────────┐
│ Browser      │
└──────────────┘

```

---

## ⚙️ Technology Stack

| Layer            | Tool                    |
| ---------------- | ----------------------- |
| CI/CD            | GitHub Actions          |
| Containerization | Docker                  |
| Image Registry   | Docker Hub              |
| Server           | AWS EC2 (Ubuntu)        |
| Web Server       | Nginx                   |
| SSL/TLS          | Let’s Encrypt (Certbot) |
| DNS              | Hostinger               |

---

## 🔁 CI/CD Workflow

### 🔹 Trigger

* Every `git push` to `main` branch

### 🔹 CI – Build & Push

* Checkout repository
* Build Docker image
* Push image to Docker Hub

### 🔹 CD – Safe Deployment to EC2

* SSH into EC2 using GitHub Actions
* Pull latest image
* Start **new container**
* Validate container startup
* Replace old container (zero-downtime)

---

## 🧪 Health Checks

The deployment supports **safe container replacement**.

* New container is started before old one is removed
* If startup fails, old container continues serving traffic

> ⚠️ Health checks are container-aware, not host-dependent

---

## 🔐 HTTPS & TLS

* HTTPS is terminated at **Nginx (host-level)**
* Certificates issued via **Certbot (Let’s Encrypt)**
* Auto-renewal enabled via systemd timer

### Domains Covered

* `lazydev.store`
* `www.lazydev.store`

---

## 🛡️ Nginx Security Hardening

### Security Headers Enabled

```nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

```

### HTTPS Enforcement

```nginx
return 301 https://$host$request_uri;

```

---

## 🌐 DNS Configuration

### Records

| Type | Name | Value         |
| ---- | ---- | ------------- |
| A    | @    | EC2 Public IP |
| A    | www  | EC2 Public IP |

> TTL delays and ISP DNS caching were handled during production debugging

---

## 🧠 Real Issues Solved

✅ 502 Bad Gateway (proxy misrouting)

✅ DNS propagation delays

✅ HTTPS validation failures

✅ Browser / ISP caching conflicts

✅ Duplicate Nginx listen directives

✅ Zero-downtime deployment safety

---

## 📂 Key Files

| File                                     | Purpose                |
| ---------------------------------------- | ---------------------- |
| .github/workflows/docker-build.yml       | CI/CD Pipeline         |
| Dockerfile                               | App container image    |
| nginx.conf                               | App-level Nginx config |
| /etc/nginx/sites-available/lazydev.store | Reverse proxy & HTTPS  |

---

## 🧪 Validation Commands

```bash
# Container health
docker ps

# Local service check
curl http://localhost:8080

# HTTPS validation
curl -v https://lazydev.store

# DNS resolution
nslookup lazydev.store

```

---

## 📌 What This Project Demonstrates

✔ Production CI/CD ownership

✔ Secure Docker-based deployment

✔ HTTPS lifecycle management

✔ Incident debugging & recovery

✔ Real-world DevOps problem solving

---

## 🧩 Future Enhancements (Optional)

* Uptime monitoring
* Rollback automation
* Terraform-based infra
* Metrics & logging stack

---

## 🏁 Final Note

This deployment reflects **real operational DevOps work**, not tutorial automation. Every component has been validated through production incidents and live traffic.

---

🔗 **Author:** Soumik Saha