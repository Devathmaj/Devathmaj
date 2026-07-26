<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:1a2a4a,100:58A6FF&height=180&section=header&text=Devathmaj%20A%20Kaliyathan&fontSize=38&fontColor=ffffff&fontAlignY=40&desc=Backend%20Software%20Engineer&descAlignY=60&descSize=16&animation=fadeIn" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=20&duration=2800&pause=900&color=58A6FF&center=true&vCenter=true&width=700&lines=Backend+Systems+%26+API+Design;Distributed+Systems;Machine+Learning+Pipelines;Cloud+%26+DevOps" />

<br/><br/>


<a href="mailto:devathmaj@gmail.com">
<img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>
</div>

<br/>

---

## About

CS undergraduate focused on backend engineering and system design — building APIs, data pipelines, and distributed systems that are correct, observable, and built to scale.

I care about the full stack below the UI: schema design, async processing, algorithmic correctness, and infrastructure that doesn't require babysitting.

<br/>

<div align="center">

| 💻 Backend | 🗄️ Data & Databases | 🤖 ML Systems | ☁️ Infrastructure |
|:-:|:-:|:-:|:-:|
| REST APIs · FastAPI · Go | PostgreSQL · Redis · SQLAlchemy · MongoDB | XGBoost · Pipelines · Feature Eng. | Docker · GitHub Actions · AWS · Azure |

</div>

---

## Projects

### [Football Market Intelligence](https://github.com/Devathmaj/Football-Market-Intelligence) — Sports Analytics & Prediction Engine

A quantitative sports analytics platform that identifies mispriced betting markets for the FIFA World Cup by comparing bookmaker-implied probabilities against proprietary ML-driven probability models.

<details>
<summary><b>What's under the hood</b></summary>

<br/>

- Multi-schema PostgreSQL design (`raw` → `core` → `features` → `predictions` → `opportunities`) with Alembic-managed migrations for deterministic deployments
- FastAPI backend following domain-driven design: repositories handle DB queries, services hold business logic, API layer exposes typed endpoints
- XGBoost multi-class classifier (`multi:softprob`) trained on Elo ratings, squad market value, rest days, and H2H history; Logistic Regression baseline for anomaly detection
- Monte Carlo tournament simulation (10k–100k runs) with dynamic re-simulation on real-world result updates to reprice futures markets in near-real-time
- Background polling loops for API-Football (fixtures, lineups, injuries every 6h; odds every 5–15 min) with a robust identity resolution layer for cross-provider team name normalization
- Kelly Criterion bankroll allocation + EV-based filtering with liquidity, volatility, and max-exposure guards
- Async SQLAlchemy (`AsyncSessionLocal`) + Uvicorn ASGI for high-concurrency request handling
- Next.js + TypeScript frontend with live dashboards: Command Center, Match Analysis, Simulation Hub, and Performance Analytics
- Dockerized multi-service stack with Prometheus integration for system observability

</details>

<br/>

<p align="left">
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/XGBoost-E94E1B?style=flat-square"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square"/>
<img src="https://img.shields.io/badge/Alembic-3C3C3C?style=flat-square"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white"/>
</p>

---

### [ClassSync](https://github.com/Devathmaj/ClassSync) — Automated Timetable Generation System

A full-stack scheduling platform that automatically generates conflict-free timetables for schools and universities, solving a multi-dimensional constraint satisfaction problem under real institutional rules.

<details>
<summary><b>What's under the hood</b></summary>

<br/>

- Custom scheduling engine combining heuristic prioritization, greedy placement, and Min-Conflicts local search — runs multiple randomized attempts and selects the solution with the highest placement score
- `lesson_weight` heuristic ranks lessons by scheduling difficulty (day restrictions, faculty load, double periods, constraint count) before placement begins
- O(1) conflict detection via multi-dimensional in-memory occupancy matrices (`class_occ`, `faculty_occ`, `room_occ`); eviction-and-requeue loop resolves deadlocks without backtracking restarts
- Supports rich constraint types: hard exclusions, max-one-per-day, subject sequences, same-day exclusions, day restrictions, and first-period reservations
- FastAPI backend with Pydantic schemas for validation; services layer cleanly separated from routes and DB repositories
- Async task offloading via Celery + Redis broker, keeping the API responsive during computation-heavy generation runs
- PostgreSQL with SQLAlchemy ORM; strict referential integrity enforced via foreign keys and cascade operations across all timetable entities
- Single Page Application frontend (TypeScript + Vite) with an admin dashboard to configure teachers, classes, subjects, and constraints
- One-command Docker Compose deployment (`docker compose up --build`)

</details>

<br/>

<p align="left">
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/Celery-37814A?style=flat-square"/>
<img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
</p>

---

### [ConfessIt](https://github.com/Devathmaj/ConfessIt-V2) — Anonymous Social Platform

A full-stack social platform built for anonymous confessions, algorithmic matchmaking, and direct messaging — designed for an academic community with a heavy focus on backend architecture, observability, and security.

<details>
<summary><b>What's under the hood</b></summary>

<br/>

- Layered FastAPI backend (routers → services → data access) with Pydantic v2 for strict schema validation at every boundary; auto-generated OpenAPI docs via Swagger
- Passwordless Magic Link authentication: secure tokens hashed and stored in MongoDB, verified against JWTs issued on success — no passwords ever stored
- MongoDB document store with startup-time index creation (`idx_timestamp_desc`, `idx_user_regno`) for sub-millisecond querying on confessions, matches, and messages; Redis for session caching and transient matchmaking state
- Feature surface: anonymous confessions with emoji reactions and threaded comments, algorithmic matchmaking, love notes with Cloudinary image storage, in-app conversation threads, and a full admin moderation dashboard
- Role-based access control (`user` / `admin`) enforced via FastAPI dependency injection on every protected route; `AdminRoute` wrapper prevents unauthorized UI access
- Full production observability stack: OpenTelemetry auto-instrumentation → collector → Grafana Tempo (traces), Promtail → Loki (logs), Prometheus + Grafana (metrics) — all provisioned via Docker Compose
- TanStack Query on the frontend for server-state caching and optimistic invalidation; React Hook Form + Zod for type-safe client-side validation
- Pytest + `mongomock` for backend unit testing; Vitest + React Testing Library for frontend component tests

</details>

<br/>

<p align="left">
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/OpenTelemetry-000000?style=flat-square"/>
<img src="https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=grafana&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
</p>

---

### [Continumm](https://github.com/Devathmaj/Continumm) — Network Telemetry & Observability Platform

A production-grade network monitoring backend that auto-discovers devices on subnets, polls health continuously, and exposes results through a REST API, Prometheus metrics, and pre-built Grafana dashboards.

<details>
<summary><b>What's under the hood</b></summary>

<br/>

- Flask + Gunicorn backend with a dedicated background thread running an asyncio event loop for network I/O — discovery and health polling run independently without ever blocking the API
- Multi-source device discovery using ARP, Scapy, and Nmap ping sweeps across configured subnets; merges results by IP and upserts into PostgreSQL, with optional concurrent service fingerprinting (`nmap -sV`) per discovered host
- Continuous health polling every 30s via ICMP and HTTP probes; parses latency, jitter, and packet loss per device — writes time-series `DeviceStatus` rows and triggers `AlertEvent` records when configurable thresholds are breached
- PostgreSQL advisory locks for distributed leader election — only one telemetry worker activates across horizontal replicas, guaranteeing single-scanner behavior without any external coordinator like Zookeeper or etcd
- REST API with endpoints for device inventory, historical metrics, alert events, and a telemetry overview; Flask middleware injects request IDs and emits structured JSON logs with trace IDs for cross-signal correlation
- Nginx reverse proxy for rate limiting, security headers, and routing; backend never exposed directly to the host with all config (DB credentials, scan targets, thresholds) driven by environment variables per 12-factor principles
- Full observability stack: OpenTelemetry auto-instrumentation → Tempo (traces), Promtail → Loki (logs), Prometheus → Grafana dashboards — entire 9-container stack provisioned via Docker Compose
- Terraform (AWS) provisions EC2 instances, VPC, and security groups; `cloud-init.yaml` handles Docker setup and firewall enforcement on first boot with zero manual steps
- Kubernetes deployment via Kustomize with discrete Deployments, Services, and Nginx Ingress; multi-stage Docker build injects the Git commit for deployment traceability
- Pytest suite spanning API routes, config, discovery logic, models, and the telemetry service; live endpoint verification script confirms stack health post-deployment

</details>

<br/>

<p align="left">
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/Flask-111111?style=flat-square&logo=flask&logoColor=white"/>
<img src="https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white"/>
<img src="https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=grafana&logoColor=white"/>
<img src="https://img.shields.io/badge/Terraform-623CE4?style=flat-square&logo=terraform&logoColor=white"/>
<img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white"/>
</p>

---

## Tech Stack

### Languages & Frameworks

<p>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"/>
</p>

### Data & Databases

<p>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
<img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white"/>
<img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Celery-37814A?style=for-the-badge"/>
<img src="https://img.shields.io/badge/WebSockets-010101?style=for-the-badge"/>
</p>

### Infrastructure & DevOps

<p>
<img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img src="https://img.shields.io/badge/Microsoft_Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white"/>
<img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white"/>
<img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white"/>
<img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white"/>
</p>


---

## GitHub Stats

<div align="center">

<img height="170em" src="https://github-readme-stats-five-brown-25.vercel.app/api?username=devathmaj&show_icons=true&theme=radical&hide_border=true&count_private=true"/>

<img height="170em" src="https://github-readme-stats-five-brown-25.vercel.app/api/top-langs/?username=devathmaj&layout=compact&theme=radical&hide_border=true"/>

</div>

<br/>

<div align="center">

<img src="https://github-readme-streak-stats.herokuapp.com/?user=Devathmaj&theme=dark&hide_border=true&background=0d1117&ring=58A6FF&fire=58A6FF&currStreakLabel=58A6FF&sideLabels=c9d1d9&dates=8b949e&currStreakNum=ffffff&sideNums=ffffff" height="165em"/>

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:58A6FF,50:1a2a4a,100:0d1117&height=120&section=footer&animation=fadeIn" width="100%"/>

</div>
