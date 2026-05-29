<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:0d1117,50:1a2a4a,100:58A6FF&amp;height=180&amp;section=header&amp;text=Devathmaj%20A%20Kaliyathan&amp;fontSize=38&amp;fontColor=ffffff&amp;fontAlignY=40&amp;desc=Systems%20and%20Reliability%20Engineer&amp;descAlignY=60&amp;descSize=16&amp;animation=fadeIn" width="100%"/>
<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&amp;weight=500&amp;size=20&amp;duration=2800&amp;pause=900&amp;color=58A6FF&amp;center=true&amp;vCenter=true&amp;width=700&amp;lines=Cloud+Infrastructure;Site+Reliability+Engineering;Backend+Systems;AI+%26+Automation" />

<br/><br/>

<p align="center">
<a href="https://linkedin.com/in/devathmaj">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="mailto:devathmaj@gmail.com">
<img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>

<a href="https://devathmaj.github.io/Portfolio">
<img src="https://img.shields.io/badge/Portfolio-58A6FF?style=for-the-badge&logo=google-chrome&logoColor=white"/>
</a>
</p>

<img src="https://komarev.com/ghpvc/?username=devathmaj&amp;style=flat-square&amp;color=58A6FF&amp;label=Profile+Views"/>

</div>

<br/>

---

## About

CS undergraduate building systems where infrastructure is code, observability is non-negotiable, and automation replaces toil.

I work at the intersection of backend engineering and reliability — designing systems that are operable from day one, not as an afterthought.

<br/>

<div align="center">

| ☁️ Cloud Infra | ⚙️ Reliability | 💻 Backend | 🤖 Automation |
|:-:|:-:|:-:|:-:|
| Kubernetes · Terraform | SLIs/SLOs · Telemetry | APIs · Distributed Systems | AI Ops · MLOps |

</div>

---

## Projects

### [Continumm](https://github.com/Devathmaj/Continumm) — Network Telemetry & Observability Platform

A production-grade network monitoring backend that auto-discovers devices on subnets, polls health continuously, and exposes results through a REST API, Prometheus metrics, and pre-built Grafana dashboards.

<details>
<summary><b>What's under the hood</b></summary>

<br/>

- Full observability stack: Prometheus · Grafana · Loki · Tempo · Alertmanager · Node Exporter
- OpenTelemetry instrumentation with distributed tracing via OTLP → Tempo
- Kubernetes manifests (Kustomize) + Docker Compose with 9 isolated services
- Terraform IaC for Azure VM provisioning with cloud-init automation
- Nginx reverse proxy with rate limiting and security headers; backend not exposed to host
- PostgreSQL advisory locks for leader election across telemetry worker replicas

</details>

<br/>

<p align="left">
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&amp;logo=python&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Flask-111111?style=flat-square&amp;logo=flask&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&amp;logo=prometheus&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Grafana-F46800?style=flat-square&amp;logo=grafana&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Loki-0A0A0A?style=flat-square"/>
<img src="https://img.shields.io/badge/Tempo-5865F2?style=flat-square"/>
<img src="https://img.shields.io/badge/Terraform-623CE4?style=flat-square&amp;logo=terraform&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&amp;logo=kubernetes&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&amp;logo=docker&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&amp;logo=postgresql&amp;logoColor=white"/>
</p>

---

### [Storage-OS](https://github.com/Devathmaj/Storage-OS) — Distributed Storage System with Custom OS

A full distributed cloud storage system: custom Buildroot Linux OS, Go controller, React frontend, and multi-node architecture with automatic data distribution and failure recovery.

<details>
<summary><b>What's under the hood</b></summary>

<br/>

- Custom Buildroot OS with 4 hand-written packages: storage core (`oscore`), server daemon, management CLI, quota system
- `oscore` implements B-tree indexed metadata, AES-256-GCM encryption, ZSTD/LZ4 compression, and LRU caching in C
- mTLS between controller and storage nodes with a built-in certificate authority
- OTP-based node enrollment; JWT + RBAC for user auth
- Go controller handles file sharding, health monitoring (30s intervals), and trash retention

</details>

<br/>

<p align="left">
<img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&amp;logo=go&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/C-00599C?style=flat-square&amp;logo=c&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&amp;logo=typescript&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=flat-square&amp;logo=react&amp;logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Buildroot-111111?style=flat-square"/>
<img src="https://img.shields.io/badge/mTLS-0A0A0A?style=flat-square"/>
<img src="https://img.shields.io/badge/QEMU-E95420?style=flat-square"/>
<img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&amp;logo=sqlite&amp;logoColor=white"/>
</p>

---

### [ConfessIt-V2](https://github.com/Devathmaj/ConfessIt-V2) — Real-Time Messaging Platform

Anonymous social platform built around real-time concurrent messaging.

<details>
<summary><b>What's under the hood</b></summary>

<br/>

- FastAPI backend with async WebSocket handling for concurrent sessions
- Redis pub/sub for message broadcasting across connections
- PostgreSQL for persistence; JWT authentication

</details>

<br/>

<p align="left">
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&amp;logo=python&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&amp;logo=fastapi&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&amp;logo=redis&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/WebSockets-010101?style=flat-square"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&amp;logo=postgresql&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&amp;logo=typescript&amp;logoColor=white"/>
</p>

---

### [Tracient](https://github.com/Devathmaj/tracient) — Blockchain Welfare Intelligence Platform

Hyperledger Fabric-based platform for income traceability, BPL/APL classification, and welfare verification using AI/ML for anomaly detection.

*(Collaborative project — my contributions: [describe your specific modules here])*

<br/>

<p align="left">
<img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&amp;logo=go&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Hyperledger_Fabric-2F3134?style=flat-square"/>
<img src="https://img.shields.io/badge/Machine_Learning-102230?style=flat-square"/>
</p>

---

## Stack

### Languages

<p>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&amp;logo=python&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&amp;logo=go&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/C-00599C?style=for-the-badge&amp;logo=c&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&amp;logo=typescript&amp;logoColor=white"/>
</p>

### Infrastructure

<p>
<img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&amp;logo=linux&amp;logoColor=black"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&amp;logo=docker&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&amp;logo=kubernetes&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Terraform-623CE4?style=for-the-badge&amp;logo=terraform&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&amp;logo=amazonaws&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&amp;logo=nginx&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Bash-121011?style=for-the-badge&amp;logo=gnubash&amp;logoColor=white"/>
</p>

### Observability

<p>
<img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&amp;logo=prometheus&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&amp;logo=grafana&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Loki-111111?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Tempo-5865F2?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Alertmanager-E6522C?style=for-the-badge"/>
<img src="https://img.shields.io/badge/OpenTelemetry-000000?style=for-the-badge"/>
</p>

### Backend

<p>
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&amp;logo=fastapi&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/REST_APIs-0A0A0A?style=for-the-badge"/>
<img src="https://img.shields.io/badge/WebSockets-010101?style=for-the-badge"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&amp;logo=redis&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&amp;logo=sqlite&amp;logoColor=white"/>
</p>

---

## GitHub Stats

<div align="center">

<img height="170em" src="https://github-readme-stats-five-brown-25.vercel.app/api?username=devathmaj&amp;show_icons=true&amp;theme=radical&amp;hide_border=true&amp;count_private=true"/>

<img height="170em" src="https://github-readme-stats-five-brown-25.vercel.app/api/top-langs/?username=devathmaj&amp;layout=compact&amp;theme=radical&amp;hide_border=true"/>

</div>

<br/>

<div align="center">

<img src="https://github-readme-streak-stats.herokuapp.com/?user=Devathmaj&amp;theme=dark&amp;hide_border=true&amp;background=0d1117&amp;ring=58A6FF&amp;fire=58A6FF&amp;currStreakLabel=58A6FF&amp;sideLabels=c9d1d9&amp;dates=8b949e&amp;currStreakNum=ffffff&amp;sideNums=ffffff" height="165em"/>

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:58A6FF,50:1a2a4a,100:0d1117&amp;height=120&amp;section=footer&amp;animation=fadeIn" width="100%"/>

</div>
