# RiderGuy Project Structure

## 📁 Root Directory Organization

```
riderguy/
├── .archive/              # Archived/historical documentation
│   └── old-docs/          # Old status reports and fixes
├── .github/               # GitHub workflows and CI/CD
├── .turbo/                # Turborepo cache
├── apps/                  # Application projects
│   ├── admin-portal/      # Admin dashboard (Vite + React)
│   ├── business-dashboard/ # Business partner dashboard
│   ├── dispatcher-dashboard/ # Dispatcher interface
│   ├── public-website/    # Marketing website (Next.js)
│   └── rider-pwa/         # Rider mobile PWA (Next.js)
├── assets/                # Static assets
│   └── images/
│       ├── branding/      # Logos and brand assets
│       └── illustrations/ # SVG illustrations
├── docs/                  # Documentation
│   ├── api/               # API documentation
│   ├── architecture/      # System architecture docs
│   ├── guides/            # Developer guides
│   ├── optimization/      # Performance optimization docs
│   └── project-status/    # Project status reports
├── infrastructure/        # Infrastructure configuration
│   ├── migrations/        # Database migrations
│   └── monitoring/        # Monitoring configs
├── packages/              # Shared packages
│   └── shared-types/      # TypeScript shared types
├── scripts/               # Build and deployment scripts
└── services/              # Microservices
    ├── analytics-service/
    ├── auth-service/
    ├── community-service/
    ├── dispatch-service/
    ├── notification-service/
    ├── rider-profile-service/
    ├── task-service/
    ├── telemetry-service/
    ├── training-service/
    ├── wallet-service/
    ├── welfare-service/
    └── xp-level-service/
```

---

## 📱 Rider PWA Structure (apps/rider-pwa/)

```
rider-pwa/
├── public/                # Static files
│   ├── icons/             # PWA icons
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service worker
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── dashboard/     # Dashboard pages
│   │   │   ├── deliveries/
│   │   │   ├── earnings/
│   │   │   ├── performance/
│   │   │   ├── rewards/
│   │   │   ├── training/
│   │   │   ├── schedule/
│   │   │   ├── welfare/
│   │   │   ├── community/
│   │   │   ├── referrals/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/        # React components
│   │   ├── dashboard/     # Dashboard-specific
│   │   │   ├── mobile-bottom-nav.tsx
│   │   │   ├── mobile-header.tsx
│   │   │   └── sidebar.tsx
│   │   ├── ui/            # Reusable UI components
│   │   │   └── cards.tsx
│   │   ├── error-boundary.tsx
│   │   ├── providers.tsx
│   │   ├── seo-head.tsx
│   │   └── web-vitals.tsx
│   ├── lib/               # Utilities and helpers
│   │   ├── seo.ts         # SEO utilities
│   │   └── utils.ts       # General utilities
│   ├── store/             # State management
│   │   └── rider-store.ts
│   └── styles/            # CSS files
│       └── mobile.css     # Mobile-first utilities
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 📚 Documentation Structure (docs/)

### `/docs/api/`
API documentation and specifications
- Endpoint definitions
- Request/response schemas
- Authentication guides

### `/docs/architecture/`
System architecture and design
- System diagrams
- Architecture decisions
- Database schemas

### `/docs/guides/`
Developer guides and references
- `development.md` - Development setup
- `quick-reference.md` - Quick component reference
- Best practices

### `/docs/optimization/`
Performance and optimization
- `mobile-optimization.md` - Mobile enhancements
- `optimization-summary.md` - Performance improvements

### `/docs/project-status/`
Current project status
- `implementation-complete.md` - Feature completion
- `implementation-summary.md` - Implementation overview
- `services-status.md` - Service health
- `system-running.md` - Runtime status

---

## 🛠 Scripts (scripts/)

### Development Scripts
- `start-all.ps1` - Start all services
- `start-dev.ps1` - Start development environment
- `stop-all.ps1` - Stop all services
- `status.ps1` - Check service status

### Build Scripts
- `generate-services.js` - Generate service boilerplate
- `system-overview.js` - System overview generator

---

## 🔧 Services Architecture

### Backend Services (services/)

#### Core Services
- **auth-service** (Node.js/TypeScript)
  - Authentication and authorization
  - JWT token management
  - User session handling

- **rider-profile-service** (Node.js/TypeScript)
  - Rider profile management
  - Profile verification
  - Document uploads

- **task-service** (Node.js/TypeScript)
  - Task/order management
  - Assignment logic
  - Status tracking

#### Specialized Services
- **dispatch-service** (Go)
  - Real-time dispatch
  - Route optimization
  - Load balancing

- **telemetry-service** (Go)
  - Location tracking
  - Real-time updates
  - GPS data processing

- **analytics-service** (Python)
  - Data analytics
  - Performance metrics
  - Reporting

#### Support Services
- **notification-service** - Push notifications
- **wallet-service** - Payment processing
- **community-service** - Social features
- **training-service** - Training content
- **welfare-service** - Support services
- **xp-level-service** - Gamification

---

## 🎨 Assets Organization (assets/)

### Images
- **branding/** - Logos, brand guidelines
- **illustrations/** - SVG illustrations for UI

### Usage
```tsx
// Import from assets
import logo from '@/assets/images/branding/logo.png';
```

---

## 📦 Package Structure (packages/)

### shared-types/
Shared TypeScript types across services
- Common interfaces
- Type definitions
- Utility types

```typescript
// Example usage
import { Rider, Delivery } from '@riderguy/shared-types';
```

---

## 🐳 Infrastructure (infrastructure/)

### migrations/
Database migration scripts
- `001_initial_schema.sql`
- `002_timescale_telemetry.sql`

### monitoring/
Monitoring and observability
- `prometheus.yml` - Metrics collection
- Grafana dashboards
- Alert configurations

---

## 🔐 Configuration Files

### Root Level
- `.env.example` - Environment variables template
- `.eslintrc.json` - ESLint configuration
- `.gitignore` - Git ignore rules
- `.prettierrc` - Code formatting rules
- `docker-compose.yml` - Docker services
- `turbo.json` - Turborepo configuration
- `tsconfig.base.json` - Base TypeScript config
- `package.json` - Root dependencies

### App Level
Each app has its own:
- `package.json` - App dependencies
- `tsconfig.json` - TypeScript config
- `next.config.js` / `vite.config.ts` - Build config
- `tailwind.config.js` - Tailwind CSS config

---

## 🚀 Quick Navigation

### For Developers
1. **Getting Started**: `docs/guides/development.md`
2. **Component Reference**: `docs/guides/quick-reference.md`
3. **Deployment Guide**: `docs/guides/deployment-guide.md`
4. **Deployment Checklist**: `docs/guides/deployment-checklist.md`
5. **Architecture**: `docs/architecture/README.md`

### For Mobile Development
1. **Mobile Optimization**: `docs/optimization/mobile-optimization.md`
2. **PWA Structure**: `apps/rider-pwa/`
3. **Mobile Components**: `apps/rider-pwa/src/components/dashboard/`

### For Backend Development
1. **Services Overview**: `services/`
2. **API Docs**: `docs/api/README.md`
3. **Database Migrations**: `infrastructure/migrations/`

---

## 📊 Project Status

### Current Implementation
- ✅ Rider PWA (Next.js 14 + TypeScript)
- ✅ 10 Dashboard pages with full functionality
- ✅ Mobile-first responsive design
- ✅ SEO optimization
- ✅ Performance monitoring
- ✅ PWA features

### In Progress
- 🔄 Backend service integration
- 🔄 Admin portal development
- 🔄 Business dashboard
- 🔄 Dispatcher interface

### Planned
- ⏳ Real-time tracking
- ⏳ Payment integration
- ⏳ Advanced analytics
- ⏳ Push notifications

---

## 🔄 Workflow

### Development Flow
1. Clone repository
2. Run `npm install` in root
3. Copy `.env.example` to `.env`
4. Run `.\scripts\start-dev.ps1`
5. Access apps:
   - Rider PWA: http://localhost:3000
   - Public Website: http://localhost:3001
   - Admin: http://localhost:5173
   - Business: http://localhost:5174
   - Dispatcher: http://localhost:5175

### Deployment Flow
1. Build: `npm run build`
2. Test: `npm run test`
3. Deploy via CI/CD pipeline

---

## 📝 Naming Conventions

### Files
- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Styles: `kebab-case.css`
- Pages: `page.tsx` (Next.js App Router)

### Folders
- All lowercase with hyphens: `rider-profile-service/`
- Component folders: `PascalCase/` (when containing index)

### Code
- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`

---

## 🔗 Related Documentation

- [README.md](../README.md) - Project overview
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [SETUP.md](../SETUP.md) - Setup instructions
- [LICENSE](../LICENSE) - License information

---

**Last Updated**: November 23, 2025
**Maintained By**: RiderGuy Development Team
**Version**: 1.0.0
