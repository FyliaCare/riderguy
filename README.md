# RiderGuy — Global Rider Network Platform

**Vision:** Build a Global Network of Skilled Riders for Delivery & Mobility through comprehensive Rider Support & Welfare.

## 🏗️ Architecture Overview

RiderGuy is a microservices-based platform consisting of:

- **Rider PWA** — Progressive Web App for riders (Next.js + React + TypeScript)
- **Dispatcher Web App** — Real-time operations dashboard (React + TypeScript)
- **Admin Portal** — Enterprise management interface (React + TypeScript)
- **Backend Services** — Polyglot microservices (Go, Node.js, Python)
- **Event Streaming** — Kafka for async communication
- **Data Layer** — PostgreSQL, TimescaleDB, Redis, MongoDB

## 📁 Project Structure

> **📖 For detailed structure documentation, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**

```
riderguy/
├── apps/
│   ├── rider-pwa/           # Rider Progressive Web App (Next.js)
│   ├── dispatcher-dashboard/# Dispatcher dashboard (React)
│   ├── admin-portal/        # Admin interface (React)
│   ├── business-dashboard/  # Business management portal
│   └── public-website/      # Marketing website
├── services/
│   ├── auth-service/        # Authentication & authorization (Node.js)
│   ├── rider-profile-service/ # Rider profiles & KYC (Node.js)
│   ├── task-service/        # Task/order lifecycle (Node.js)
│   ├── dispatch-service/    # Smart matching engine (Go)
│   ├── wallet-service/      # Ledger & payouts (Node.js)
│   ├── training-service/    # LMS & certifications (Node.js)
│   ├── xp-level-service/    # Gamification engine (Node.js)
│   ├── community-service/   # Forums & social (Node.js)
│   ├── welfare-service/     # Insurance & financial aid (Node.js)
│   ├── notification-service/# Multi-channel notifications (Node.js)
│   ├── telemetry-service/   # Time-series ingestion (Go)
│   └── analytics-service/   # ML & feature serving (Python)
├── packages/
│   └── shared-types/        # TypeScript types & DTOs
├── infrastructure/
│   ├── monitoring/          # Prometheus, Grafana configs
│   └── migrations/          # Database migrations
├── docs/
│   ├── api/                 # API documentation
│   ├── architecture/        # System design docs
│   ├── guides/              # Developer guides
│   ├── optimization/        # Performance & mobile optimization docs
│   └── project-status/      # Implementation status & reports
├── scripts/                 # Build & deployment scripts
└── assets/                  # Images, branding, illustrations
```

## 🚀 Core Features

### Rider PWA
- Progressive onboarding with KYC & document verification
- Availability toggle & job feed
- Route navigation with offline support
- Proof-of-delivery (photo, signature, OTP)
- Earnings & instant wallet withdrawals
- Training & certifications (LMS)
- Gamification (XP, levels, leaderboards)
- Community hub (forums, chat)
- Safety features (panic button, incident reporting)
- Welfare (insurance, microloans, emergency funds)

### Dispatcher/Operations
- Real-time dispatch board with map view
- Smart matching suggestions (AI + rules)
- Bulk assignment & reassignment
- Incident & escalation management
- Rider roster & certification tracking
- Shift scheduling & demand forecasting

### Admin & Enterprise
- Multi-tenant organization management
- Policy & rules engine
- Payment settlements & reconciliation
- Analytics & BI dashboards
- Training course builder
- Welfare administration
- Audit logs & compliance

### Training & Certification (LMS)
- Course builder (video, quizzes, interactive)
- Adaptive learning paths
- Offline course downloads
- Certificate issuance with QR verification
- Course expiry & refresher scheduling

### Community & Social
- Regional hubs & discussion forums
- AI + human moderation
- Mentor matching
- Events & meetups

### Welfare & Financial Inclusion
- Insurance enrollment & claims
- Emergency microgrants & loans
- Gear subsidies
- Financial literacy modules

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **UI:** React 18+, TailwindCSS, shadcn/ui
- **State:** React Query, Zustand
- **Maps:** Mapbox GL / Google Maps
- **PWA:** Workbox, IndexedDB
- **Real-time:** WebSockets, Server-Sent Events

### Backend
- **API Gateway:** Node.js (Express/Fastify) or Go (Gin)
- **Services:** Node.js/TypeScript, Go, Python
- **API Patterns:** REST, GraphQL, gRPC
- **Message Queue:** Apache Kafka / Pulsar
- **Task Queue:** BullMQ (Redis-based)

### Data & Storage
- **Primary DB:** PostgreSQL 15+
- **Time-series:** TimescaleDB
- **Cache:** Redis 7+
- **Document Store:** MongoDB / DynamoDB
- **Object Storage:** S3-compatible (MinIO/AWS S3)
- **Search:** Elasticsearch / OpenSearch

### Infrastructure
- **Orchestration:** Kubernetes
- **Container:** Docker
- **IaC:** Terraform
- **CI/CD:** GitHub Actions
- **Monitoring:** Prometheus + Grafana
- **Tracing:** OpenTelemetry + Jaeger
- **Logs:** ELK Stack / OpenSearch

### Auth & Security
- **Protocol:** OAuth 2.0 / OIDC
- **Tokens:** JWT with refresh tokens
- **2FA:** TOTP (Google Authenticator)
- **Encryption:** AES-256 at rest, TLS 1.3 in transit

## 📊 Data Model Highlights

### Core Entities
- **Riders:** Profile, documents, status, rating, certifications
- **Tasks:** Orders, pickup/dropoff, assignment, POD, SLA
- **Wallets:** Balance, transactions, holds, payouts
- **Training:** Courses, lessons, progress, certificates
- **XP/Levels:** Events, balance, thresholds, privileges
- **Community:** Posts, threads, channels, moderation
- **Welfare:** Insurance, claims, loans, emergency funds
- **Incidents:** Reports, evidence, escalation, resolution

## 🔄 Event-Driven Architecture

Key event topics:
- `task.created`, `task.assigned`, `task.completed`
- `rider.online`, `rider.offline`, `rider.location.update`
- `training.completed`, `xp.awarded`, `level.upgraded`
- `incident.reported`, `incident.escalated`
- `wallet.transaction.*`, `payout.completed`

## 🎯 KPIs & Metrics

- Rider activation rate (onboarded → active within 7 days)
- Average tasks per rider per day
- On-time delivery percentage
- Training completion rate
- XP-driven retention lift
- Incident rate per 1,000 tasks
- Wallet payout time (median)
- Community engagement metrics

## 🚦 Deployment Phases

### Phase 1: MVP (Core Operations)
- Basic rider onboarding & KYC
- Task assignment & completion
- Manual dispatch
- Basic training & community
- Simple wallet & payouts

### Phase 2: Automation & Growth
- Smart matching engine
- XP & gamification
- Advanced training (offline, certificates)
- Real-time community chat
- Instant payouts
- Welfare integrations

### Phase 3: Scale & AI
- ML-powered demand forecasting
- Multi-region deployment
- Advanced fraud detection
- Partner APIs & SDKs

### Phase 4: Platform Ecosystem
- Marketplace for services
- Edge compute dispatch
- Blockchain certificates (optional)

## 🔐 Security & Compliance

- OWASP Top 10 protection
- PII encryption at rest
- TLS 1.3 everywhere
- RBAC + ABAC for fine-grained access
- Audit logging (immutable, append-only)
- GDPR/CCPA ready (data export/erase)
- PCI DSS compliant payment flows

## 🧪 Development Setup

> **📖 For detailed setup guide, see [docs/guides/development.md](./docs/guides/development.md)**  
> **🚀 For quick reference, see [docs/guides/quick-reference.md](./docs/guides/quick-reference.md)**

### Prerequisites
- Node.js 20+
- Go 1.21+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+
- Kafka (or Confluent Cloud)

### Quick Start

```bash
# Install dependencies
npm install

# Start infrastructure (DB, Redis, Kafka)
docker-compose up -d

# Run database migrations
npm run migrate

# Start all services (development)
.\scripts\start-dev.ps1

# Start specific service
npm run dev:auth-service
npm run dev:rider-pwa

# Run tests
npm run test

# Build for production
npm run build
```

## 🚀 Deployment

### Production Stack
- **Frontend & Services**: [Render](https://render.com) - Web services & background workers
- **Database**: [Neon](https://neon.tech) - Serverless PostgreSQL
- **Cache**: Render Redis or [Redis Cloud](https://redis.com/cloud)

### Quick Deploy

```bash
# 1. Set up Neon database
.\scripts\setup-neon.ps1

# 2. Deploy to Render (via Blueprint)
# Push to GitHub, then in Render:
# Dashboard → New → Blueprint → Select render.yaml

# 3. Or deploy with script
$env:RENDER_API_KEY="your-api-key"
.\scripts\deploy.ps1 -Production
```

### Documentation
- **📘 [Deployment Guide](./docs/guides/deployment-guide.md)** - Complete setup instructions
- **✅ [Deployment Checklist](./docs/guides/deployment-checklist.md)** - Pre/post deployment tasks
- **🔧 [Render Blueprint](./render.yaml)** - Infrastructure as code

## 📚 Documentation

### Main Documentation
- [📖 Project Structure](./PROJECT_STRUCTURE.md) — Complete directory organization
- [Architecture Overview](./docs/architecture/README.md)
- [API Documentation](./docs/api/README.md)
- [Development Guide](./docs/guides/development.md)
- [Quick Reference](./docs/guides/quick-reference.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

### Status & Reports
- [Implementation Status](./docs/project-status/implementation-complete.md)
- [Services Status](./docs/project-status/services-status.md)
- [System Running](./docs/project-status/system-running.md)

### Optimization
- [Mobile Optimization](./docs/optimization/mobile-optimization.md)
- [Optimization Summary](./docs/optimization/optimization-summary.md)

## 📄 License

Proprietary - All rights reserved

## 🤝 Support

For support and questions, contact: support@riderguy.io

---

**Built with ❤️ for the global rider community**
