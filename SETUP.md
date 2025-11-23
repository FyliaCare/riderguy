# 🚀 RiderGuy — Quick Start Guide

Welcome to **RiderGuy**, a comprehensive platform for building a global network of skilled riders! This guide will get you up and running in minutes.

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/your-org/riderguy.git
cd riderguy

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env

# 4. Start infrastructure (Docker)
npm run docker:up

# 5. Run database migrations
npm run migrate

# 6. Start all services
npm run dev
```

🎉 **Done!** Access the apps:
- Rider PWA: http://localhost:3000
- Auth Service: http://localhost:4001
- Grafana: http://localhost:3001

---

## 📋 What's Included

### Frontend Applications
✅ **Rider PWA** - Progressive Web App for riders (Next.js + React + TypeScript)
- Dashboard with earnings, tasks, and stats
- Real-time task feed
- Offline support with service workers
- Push notifications
- Installable on mobile/desktop

✅ **Dispatcher Web** - Operations dashboard (coming soon)
✅ **Admin Portal** - Enterprise management (coming soon)

### Backend Microservices
✅ **Auth Service** - Complete authentication system
- User registration & login
- JWT access + refresh tokens
- 2FA with TOTP (Google Authenticator)
- Password reset flows
- Session management
- RBAC support

🔧 **Other Services** (templates ready for implementation):
- Rider Profile Service
- Task/Order Service
- Dispatch Service (Go)
- Wallet Service
- Training/LMS Service
- Community Service
- Welfare Service
- Telemetry Service
- Analytics Service (Python)

### Shared Packages
✅ **@riderguy/shared-types** - TypeScript definitions for all entities, events, and DTOs
✅ **@riderguy/ui-components** - Shared React components (coming soon)
✅ **@riderguy/utils** - Common utilities

### Infrastructure
✅ **Docker Compose** - Full local development stack
✅ **Database Migrations** - PostgreSQL + TimescaleDB schemas
✅ **Monitoring** - Prometheus + Grafana + Jaeger
✅ **CI/CD** - GitHub Actions workflow

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│              Frontend (PWA + Web Apps)              │
└──────────────────────┬──────────────────────────────┘
                       │
                ┌──────▼──────┐
                │ API Gateway │
                └──────┬──────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
┌──────▼──────┐  ┌────▼────┐  ┌──────▼──────┐
│Auth Service │  │  Rider  │  │    Task     │
│  (Node.js)  │  │ Profile │  │   Service   │
└─────────────┘  └─────────┘  └─────────────┘
                       │
                ┌──────▼──────┐
                │    Kafka    │ (Event Bus)
                └──────┬──────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
┌──────▼──────┐  ┌────▼────┐  ┌──────▼──────┐
│ PostgreSQL  │  │  Redis  │  │   MinIO     │
│ (Primary DB)│  │ (Cache) │  │  (Storage)  │
└─────────────┘  └─────────┘  └─────────────┘
```

**Tech Stack:**
- Frontend: Next.js 14, React 18, TypeScript, TailwindCSS
- Backend: Node.js, Express, Go (for high-performance services)
- Databases: PostgreSQL, TimescaleDB, Redis, MongoDB
- Messaging: Apache Kafka
- Monitoring: Prometheus, Grafana, Jaeger

---

## 📱 Rider PWA Features

### ✅ Implemented
- [x] Responsive dashboard with earnings & stats
- [x] Real-time task feed
- [x] Availability toggle
- [x] PWA manifest & service worker
- [x] Offline-first architecture
- [x] Modern UI with TailwindCSS
- [x] State management with Zustand
- [x] Data fetching with React Query

### 🔧 Coming Soon
- [ ] Task acceptance & completion flow
- [ ] Map integration (Mapbox/Google Maps)
- [ ] Proof-of-delivery (photo, signature, OTP)
- [ ] Real-time navigation
- [ ] Training modules & certifications
- [ ] Community forums & chat
- [ ] Wallet & instant payouts
- [ ] Safety features (panic button, incident reporting)
- [ ] Gamification (XP, levels, leaderboards)

---

## 🔐 Auth Service Features

### ✅ Fully Implemented
- [x] User registration with validation
- [x] Email/password login
- [x] JWT access tokens (15min expiry)
- [x] Refresh tokens (7 day expiry)
- [x] 2FA setup with QR code generation
- [x] 2FA verification with TOTP
- [x] Password reset flow
- [x] Password change
- [x] Session management
- [x] Session revocation
- [x] Comprehensive error handling
- [x] Request logging
- [x] Rate limiting ready

### 🔒 Security Features
- Bcrypt password hashing (10 rounds)
- JWT with RS256 signing
- TOTP-based 2FA (RFC 6238)
- Secure session storage (Redis)
- CORS protection
- Helmet.js security headers
- Input validation with Joi

---

## 📊 Database Schema

### Core Tables Created
✅ `riders` - Rider profiles, status, ratings, XP
✅ `rider_documents` - KYC documents, verification status
✅ `tasks` - Orders, assignments, POD
✅ `wallets` - Balances, holds, total earnings
✅ `transactions` - Ledger entries
✅ `courses` - Training course catalog
✅ `lessons` - Course content
✅ `training_progress` - Course completion tracking
✅ `xp_events` - Gamification events
✅ `levels` - Level definitions with privileges
✅ `community_posts` - Forum posts
✅ `channels` - Community channels
✅ `insurance_enrollments` - Rider insurance
✅ `loan_applications` - Microloan requests
✅ `incidents` - Safety incident reports
✅ `referrals` - Referral tracking

### TimescaleDB Tables
✅ `telemetry` - High-frequency location & sensor data
✅ `telemetry_hourly` - Aggregated metrics

---

## 🧪 Testing the System

### Test Auth Service

```bash
# Register a new user
curl -X POST http://localhost:4001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Rider",
    "email": "rider@test.com",
    "phone": "+1234567890",
    "password": "password123",
    "regionId": "uuid"
  }'

# Login
curl -X POST http://localhost:4001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rider@test.com",
    "password": "password123"
  }'

# Use the returned accessToken for authenticated requests
```

### Test Rider PWA

1. Open http://localhost:3000
2. You'll be redirected to `/dashboard`
3. See mock data for:
   - Earnings: $85.50
   - Tasks completed: 12
   - Rating: 4.8
   - Streak: 7 days
4. Toggle availability (mock update)
5. View available tasks (mock data)
6. Navigate using bottom tabs

---

## 📦 What's Next?

### Phase 1: Complete MVP (2-3 weeks)
1. **Complete Core Services**
   - [ ] Rider Profile Service (document uploads, KYC)
   - [ ] Task/Order Service (full lifecycle)
   - [ ] Wallet Service (earnings, payouts)
   - [ ] Basic Dispatch (manual assignment)

2. **Integrate PWA with Backend**
   - [ ] Replace mock data with real API calls
   - [ ] Implement authentication flow
   - [ ] Add task acceptance/completion
   - [ ] Integrate maps for navigation

3. **Build Dispatcher Dashboard**
   - [ ] Real-time task board
   - [ ] Rider roster view
   - [ ] Manual task assignment
   - [ ] Incident management

### Phase 2: Advanced Features (1-2 months)
- [ ] Smart matching algorithm (AI-powered dispatch)
- [ ] Training/LMS with video lessons & quizzes
- [ ] Community forums with real-time chat
- [ ] XP & gamification system
- [ ] Instant payouts integration
- [ ] Background check integration

### Phase 3: Scale & Production (2-3 months)
- [ ] Multi-region deployment
- [ ] Advanced analytics & ML models
- [ ] Partner APIs & SDKs
- [ ] Blockchain certificates (optional)

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Development
npm run dev                    # Start all services
npm run dev:rider-pwa         # Start only PWA
npm run dev:auth              # Start only Auth Service

# Building
npm run build                 # Build all
npm run build --workspace=rider-pwa  # Build specific

# Testing
npm test                      # Run all tests
npm run lint                  # Lint code
npm run type-check            # TypeScript check
npm run format                # Format with Prettier

# Database
npm run migrate               # Run migrations
npm run migrate:create        # Create new migration

# Docker
npm run docker:up             # Start infrastructure
npm run docker:down           # Stop infrastructure
npm run docker:logs           # View logs

# Cleanup
npm run clean                 # Clean build artifacts
```

---

## 🌐 Service Ports

| Service | Port | URL |
|---------|------|-----|
| Rider PWA | 3000 | http://localhost:3000 |
| Dispatcher Web | 3002 | http://localhost:3002 |
| Admin Portal | 3003 | http://localhost:3003 |
| Auth Service | 4001 | http://localhost:4001 |
| Rider Profile | 4002 | http://localhost:4002 |
| Task Service | 4003 | http://localhost:4003 |
| Dispatch Service | 4004 | http://localhost:4004 |
| Wallet Service | 4005 | http://localhost:4005 |
| PostgreSQL | 5432 | localhost:5432 |
| TimescaleDB | 5433 | localhost:5433 |
| Redis | 6379 | localhost:6379 |
| MongoDB | 27017 | localhost:27017 |
| Kafka | 9092 | localhost:9092 |
| MinIO | 9000 | http://localhost:9000 |
| Elasticsearch | 9200 | http://localhost:9200 |
| Prometheus | 9090 | http://localhost:9090 |
| Grafana | 3001 | http://localhost:3001 |
| Jaeger | 16686 | http://localhost:16686 |

---

## 📚 Documentation

- [Architecture Overview](./docs/architecture/README.md)
- [API Documentation](./docs/api/README.md)
- [Development Guide](./docs/guides/development.md)
- [Deployment Guide](./docs/guides/deployment.md) (coming soon)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

### Docker containers won't start
```bash
docker-compose down -v
docker-compose up -d
```

### Port already in use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Database connection errors
Check that PostgreSQL is running:
```bash
docker-compose ps postgres
```

Reset database:
```bash
docker-compose down -v
docker-compose up -d postgres
npm run migrate
```

---

## 📞 Support

- **Documentation**: Check `docs/` folder
- **Issues**: Open a GitHub issue
- **Email**: dev@riderguy.io

---

## 📄 License

Proprietary - All rights reserved © 2024 RiderGuy

---

**Built with ❤️ for the global rider community**

Ready to revolutionize rider welfare and operations! 🚀
