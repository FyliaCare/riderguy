# RiderGuy System Architecture

## Overview

RiderGuy is built as a microservices-based platform designed for global scale, rider welfare, and operational excellence. The architecture emphasizes:

- **Scalability**: Horizontal scaling for individual services
- **Resilience**: Fault isolation and graceful degradation
- **Performance**: Sub-100ms p95 latency for critical paths
- **Security**: Defense in depth with encryption, RBAC, and audit logging
- **Observability**: Comprehensive metrics, logs, and distributed tracing

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       Client Applications                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Rider PWA   │  │  Dispatcher  │  │ Admin Portal │         │
│  │  (Next.js)   │  │     Web      │  │     Web      │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   CDN / WAF       │
                    │  (Cloudflare)     │
                    └─────────┬─────────┘
                              │
┌─────────────────────────────▼─────────────────────────────────┐
│                      API Gateway Layer                         │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  - Rate Limiting    - Auth Validation                  │   │
│  │  - Request Routing  - Response Caching                 │   │
│  │  - GraphQL Façade   - API Versioning                   │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬─────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌───────▼────────┐   ┌───────▼────────┐
│  Auth Service  │   │ Rider Profile  │   │  Task Service  │
│   (Node.js)    │   │   (Node.js)    │   │   (Node.js)    │
└────────────────┘   └────────────────┘   └────────────────┘

┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│ Dispatch Svc   │   │  Wallet Svc    │   │ Training Svc   │
│     (Go)       │   │   (Node.js)    │   │   (Node.js)    │
└────────────────┘   └────────────────┘   └────────────────┘

┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│ Community Svc  │   │  Welfare Svc   │   │ Analytics Svc  │
│   (Node.js)    │   │   (Node.js)    │   │   (Python)     │
└────────────────┘   └────────────────┘   └────────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Event Bus       │
                    │   (Kafka)         │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌───────▼────────┐   ┌───────▼────────┐
│   PostgreSQL   │   │  TimescaleDB   │   │     Redis      │
│  (Relational)  │   │  (Time-series) │   │  (Cache/Queue) │
└────────────────┘   └────────────────┘   └────────────────┘

┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│    MongoDB     │   │   S3 Storage   │   │ Elasticsearch  │
│   (Documents)  │   │    (Media)     │   │   (Search)     │
└────────────────┘   └────────────────┘   └────────────────┘
```

## Service Boundaries

### 1. Auth Service
**Responsibility**: Authentication, authorization, session management

**Key Functions**:
- User registration & login
- JWT token issuance & validation
- 2FA (TOTP)
- Password management
- RBAC enforcement

**Tech Stack**: Node.js, Express, JWT, Speakeasy, Redis

**Database**: PostgreSQL (users, roles, permissions)

**Events Published**:
- `user.registered`
- `user.logged_in`
- `session.created`

---

### 2. Rider Profile Service
**Responsibility**: Rider identity, documents, KYC

**Key Functions**:
- Profile CRUD
- Document upload & verification
- Background check integration
- Certification tracking

**Tech Stack**: Node.js, Express, Multer

**Database**: PostgreSQL (riders, documents)

**Events Published**:
- `rider.created`
- `rider.verified`
- `document.uploaded`
- `kyc.completed`

---

### 3. Task Order Service
**Responsibility**: Order lifecycle, POD, SLA tracking

**Key Functions**:
- Task creation & assignment
- Status transitions
- Proof-of-delivery
- SLA monitoring

**Tech Stack**: Node.js, Express

**Database**: PostgreSQL (tasks, POD)

**Events Published**:
- `task.created`
- `task.assigned`
- `task.completed`
- `task.canceled`

---

### 4. Dispatch Service
**Responsibility**: Smart matching, route optimization

**Key Functions**:
- Real-time rider availability
- AI-powered task matching
- Manual dispatch override
- Load balancing

**Tech Stack**: Go, gRPC

**Database**: Redis (availability state), PostgreSQL (assignment rules)

**Events Consumed**: `rider.online`, `task.created`

**Events Published**: `task.assigned`, `dispatch.failed`

---

### 5. Wallet Service
**Responsibility**: Ledger, payouts, reconciliation

**Key Functions**:
- Balance management
- Transaction logging
- Instant payouts
- Settlement batching

**Tech Stack**: Node.js, Express

**Database**: PostgreSQL (wallets, transactions)

**Events Published**:
- `wallet.transaction.created`
- `wallet.payout.completed`

---

### 6. Training Service (LMS)
**Responsibility**: Course management, assessments, certificates

**Key Functions**:
- Course builder
- Lesson delivery
- Quiz engine
- Certificate generation

**Tech Stack**: Node.js, Express, PDF generation

**Database**: PostgreSQL (courses, progress), S3 (media)

**Events Published**:
- `training.started`
- `training.completed`
- `certificate.issued`

---

### 7. XP & Level Service
**Responsibility**: Gamification, leaderboards

**Key Functions**:
- XP calculation
- Level progression
- Leaderboard updates
- Anti-fraud detection

**Tech Stack**: Node.js, Express

**Database**: PostgreSQL (xp_events, levels), Redis (leaderboards)

**Events Consumed**: `task.completed`, `training.completed`

**Events Published**: `xp.awarded`, `level.upgraded`

---

### 8. Community Service
**Responsibility**: Forums, chat, moderation

**Key Functions**:
- Post CRUD
- Real-time chat (WebSocket)
- AI + human moderation
- Mentor matching

**Tech Stack**: Node.js, Express, Socket.io

**Database**: MongoDB (posts, threads), Redis (real-time state)

**Events Published**:
- `post.created`
- `post.flagged`

---

### 9. Welfare Service
**Responsibility**: Insurance, loans, emergency funds

**Key Functions**:
- Insurance enrollment
- Claim processing
- Loan applications
- Emergency fund disbursement

**Tech Stack**: Node.js, Express

**Database**: PostgreSQL (enrollments, loans)

**Events Published**:
- `insurance.enrolled`
- `loan.approved`
- `emergency_fund.disbursed`

---

### 10. Notification Service
**Responsibility**: Multi-channel notifications

**Key Functions**:
- Web push (VAPID)
- Email (SendGrid)
- SMS (Twilio)
- WhatsApp

**Tech Stack**: Node.js, BullMQ

**Database**: PostgreSQL (notification log), Redis (queues)

**Events Consumed**: All major events

---

### 11. Telemetry Service
**Responsibility**: Location tracking, safety analytics

**Key Functions**:
- High-throughput ingestion
- Real-time location streaming
- Safety pattern detection
- Historical analytics

**Tech Stack**: Go, TimescaleDB

**Database**: TimescaleDB (telemetry)

**Events Published**:
- `rider.location.update`
- `safety.alert`

---

### 12. Analytics Service
**Responsibility**: ML models, feature store, dashboards

**Key Functions**:
- Demand forecasting
- ETA prediction
- Churn prediction
- Safety risk scoring

**Tech Stack**: Python, FastAPI, scikit-learn, TensorFlow

**Database**: PostgreSQL (feature store), Parquet (data lake)

---

## Data Flow Examples

### Example 1: Task Assignment Flow

```
1. Merchant creates task via API
   → task-order-service stores in DB
   → Publishes `task.created` event to Kafka

2. dispatch-service consumes event
   → Queries available riders from Redis
   → Runs matching algorithm (distance, rating, level)
   → Assigns task to best rider
   → Publishes `task.assigned` event

3. notification-service consumes event
   → Sends push notification to rider PWA

4. Rider accepts task
   → task-order-service updates status
   → Publishes `task.accepted` event

5. xp-level-service consumes task completion
   → Calculates XP based on performance
   → Updates rider level if threshold reached
   → Publishes `xp.awarded`, `level.upgraded`

6. wallet-service consumes task completion
   → Creates earning transaction
   → Updates wallet balance
   → Publishes `wallet.transaction.completed`
```

### Example 2: Training Completion & Certification

```
1. Rider starts course
   → training-service records progress
   → Publishes `training.started`

2. Rider completes all lessons & passes quiz
   → training-service validates score
   → Generates certificate PDF
   → Uploads to S3
   → Publishes `training.completed`

3. xp-level-service consumes event
   → Awards XP for course completion
   → Publishes `xp.awarded`

4. rider-profile-service consumes event
   → Updates certifications list
   → Publishes `rider.certified`

5. notification-service sends congratulations
   → Web push + email with certificate link
```

---

## Technology Choices

### Backend Languages

| Language | Use Cases | Services |
|----------|-----------|----------|
| **Node.js/TypeScript** | Business logic, CRUD APIs | Auth, Profile, Task, Wallet, Training, Community, Welfare |
| **Go** | High-performance, low-latency | Dispatch, Routing, Telemetry Ingestion |
| **Python** | ML, data processing | Analytics, ML serving |

### Databases

| Database | Use Cases |
|----------|-----------|
| **PostgreSQL** | Primary relational data (riders, tasks, wallets) |
| **TimescaleDB** | Time-series telemetry, location history |
| **Redis** | Cache, rate limiting, leaderboards, queues, sessions |
| **MongoDB** | Document store (community posts, logs) |
| **Elasticsearch** | Full-text search, log aggregation |

### Messaging & Events

| Technology | Use Cases |
|------------|-----------|
| **Kafka** | Event streaming, pub/sub, event sourcing |
| **BullMQ (Redis)** | Job queues, delayed jobs, retries |

### Observability

| Tool | Purpose |
|------|---------|
| **Prometheus** | Metrics collection |
| **Grafana** | Metrics visualization |
| **Jaeger** | Distributed tracing |
| **ELK / OpenSearch** | Log aggregation & search |
| **Sentry** | Error tracking |

---

## Security Architecture

### Authentication Flow

```
1. Client sends credentials to Auth Service
2. Auth Service validates & issues:
   - Access Token (JWT, 15min expiry)
   - Refresh Token (7 day expiry, stored in Redis)
3. Client includes Access Token in Authorization header
4. API Gateway validates token signature
5. If expired, client uses Refresh Token to get new Access Token
```

### Authorization (RBAC)

Roles:
- `rider`
- `dispatcher`
- `admin`
- `trainer`
- `support`

Permissions checked at:
1. API Gateway (coarse-grained)
2. Service level (fine-grained)

### Data Protection

- **At Rest**: AES-256 encryption for PII fields
- **In Transit**: TLS 1.3 for all connections
- **Secrets**: Vault / AWS Secrets Manager
- **PCI Compliance**: Payment provider-hosted forms (no card storage)

---

## Deployment Architecture

### Kubernetes Cluster Layout

```
Namespaces:
- production
- staging
- development

Deployments:
- rider-pwa (3 replicas)
- auth-service (3 replicas)
- dispatch-service (5 replicas, HPA enabled)
- wallet-service (3 replicas)
- ... (other services)

StatefulSets:
- kafka (3 brokers)
- redis (1 master + 2 replicas)

Managed Services (Cloud):
- PostgreSQL (RDS/Cloud SQL)
- TimescaleDB (managed instance)
- S3 / Cloud Storage
- Load Balancer
```

### Multi-Region Strategy

**Phase 1 (MVP)**: Single region
**Phase 2**: Active-passive (disaster recovery)
**Phase 3**: Active-active with:
- GeoDNS routing
- Regional data residency
- Cross-region replication for critical data

---

## Performance Targets

| Metric | Target |
|--------|--------|
| API p95 latency | < 100ms |
| API p99 latency | < 500ms |
| Task assignment time | < 2s |
| PWA load time (3G) | < 3s |
| Availability (critical services) | 99.95% |
| Data freshness (analytics) | < 5min |

---

## Disaster Recovery

**RTO (Recovery Time Objective)**: 1 hour
**RPO (Recovery Point Objective)**: 5 minutes

**Backup Strategy**:
- Database snapshots: Every 6 hours
- Transaction logs: Continuous
- S3 versioning: Enabled
- Kafka retention: 7 days

**Runbooks**:
- Database failover
- Service degradation (circuit breakers)
- Rollback procedures
- Data corruption recovery

---

## Scaling Strategy

### Horizontal Scaling
- Stateless services: Auto-scale based on CPU/memory
- Dispatch service: Scale based on queue depth

### Vertical Scaling
- Database: Upgrade instance size before partitioning
- Redis: Cluster mode for > 100GB data

### Partitioning
- Database sharding by `region_id`
- Kafka topic partitioning by `rider_id`

---

## Future Enhancements

1. **GraphQL Federation**: Unified schema across services
2. **Service Mesh (Istio)**: Advanced traffic management
3. **Edge Compute**: Deploy dispatch logic at CDN edge
4. **Blockchain**: Immutable certificate registry
5. **Real-time ML**: Online learning for dispatch
