# 🚀 GSAP Landing Page

> A **GSAP landing page** deployed with **Docker, Nginx, HTTPS, and CI/CD** on AWS EC2.

🌐 **Live:** [https://lazydev.store](https://lazydev.store/)  
📄 **Deep-dive:** [DEPLOYMENT.md](https://chatgpt.com/c/DEPLOYMENT.md)

---

## ✨ Highlights

* ⚙️ **End-to-end CI/CD** with GitHub Actions
* 🐳 **Dockerized** multi-stage build (small, fast images)
* 🔐 **HTTPS (TLS)** via Let’s Encrypt (Certbot)
* 🌐 **Custom domain & DNS** configuration
* 🔁 **Safe container replacement** (zero-downtime style)
* 🛡️ **Nginx hardening** (security headers, TLS config)
* 🧪 **Health checks** gating deployments
* 🔍 **Real production debugging** (DNS caching, 502s, SSL conflicts)

This repository documents a **real production deployment**, not a demo.

---

## 🧱 Architecture

```
Developer
   │ git push
   ▼
GitHub Repository (main)
   │
   ▼
GitHub Actions (CI/CD)
   ├─ Build Docker image
   ├─ Push to Docker Hub
   └─ Deploy to EC2 via SSH
        │
        ▼
AWS EC2 (Ubuntu)
   ├─ Nginx (Reverse Proxy + HTTPS)
   └─ Docker Container (GSAP App)
        │
        ▼
Browser (HTTPS)

```

---

## 🛠️ Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Frontend         | GSAP, Vite              |
| Containerization | Docker                  |
| CI/CD            | GitHub Actions          |
| Registry         | Docker Hub              |
| Compute          | AWS EC2 (Ubuntu)        |
| Reverse Proxy    | Nginx                   |
| TLS              | Let’s Encrypt (Certbot) |
| DNS              | Hostinger               |

---

## 🔁 CI/CD Workflow

### Trigger

* Any push to the `main` branch

### CI (Build)

* Checkout code
* Build optimized Docker image
* Push image to Docker Hub

### CD (Deploy)

* SSH into EC2
* Pull latest image
* Start new container
* Verify readiness (health)
* Replace old container safely

> HTTPS and the reverse proxy remain untouched during deployments.

---

## 🔐 Security & Hardening

* Enforced HTTPS (HTTP → HTTPS)
* TLS 1.2 / 1.3
* Security headers enabled:  
   * `X-Frame-Options`  
   * `X-Content-Type-Options`  
   * `X-XSS-Protection`  
   * `Referrer-Policy`  
   * `Permissions-Policy`
* Nginx server tokens disabled
* Sensitive file access blocked

---

## 🧪 Health Checks

* Lightweight `/health` endpoint
* Container-level health awareness
* Deployments gated on readiness

---

## 🧠 Production Issues Solved

* 502 Bad Gateway (Nginx ↔ Docker)
* SSL validation and renewal issues
* DNS propagation & ISP caching
* Duplicate Nginx `listen` directives
* Browser cache poisoning
* Safe container replacement failures

---

## 📂 Repository Structure

```
.github/workflows/
 └── docker-build.yml
Dockerfile
README.md
DEPLOYMENT.md
src/

```

---

## ▶️ Local Development

```bash
npm install
npm run dev

```

---

## 📌 Why This Project

This project demonstrates:

* Ownership of production infrastructure
* CI/CD beyond simple builds
* Secure HTTPS lifecycle management
* Practical DevOps debugging
* Clear operational documentation

---

## 🔮 Future Enhancements

* Monitoring & uptime alerts
* Rollback automation
* Infrastructure as Code (Terraform)
* CDN fronting (Cloudflare)

---

## 👤 Author

**Soumik Saha**  
GitHub: <https://github.com/soumik9870>

---

⭐ If you find this project useful, consider starring the repository!