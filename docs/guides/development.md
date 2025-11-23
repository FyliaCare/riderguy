# RiderGuy Development Guide

Welcome to the RiderGuy development team! This guide will help you set up your development environment and understand our development workflow.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **Go** 1.21+ ([Download](https://go.dev/))
- **Python** 3.11+ ([Download](https://python.org/))
- **Docker** & Docker Compose ([Download](https://docker.com/))
- **PostgreSQL** 15+ ([Download](https://postgresql.org/))
- **Git** ([Download](https://git-scm.com/))
- **VS Code** (recommended) ([Download](https://code.visualstudio.com/))

### VS Code Extensions (Recommended)

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Docker
- PostgreSQL
- Thunder Client (API testing)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/riderguy.git
cd riderguy
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for all workspaces (apps, services, packages).

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your local configuration. For development, the defaults should work with Docker Compose.

### 4. Start Infrastructure Services

```bash
npm run docker:up
```

This starts:
- PostgreSQL (port 5432)
- TimescaleDB (port 5433)
- Redis (port 6379)
- MongoDB (port 27017)
- Kafka (port 9092)
- MinIO (port 9000)
- Elasticsearch (port 9200)
- Prometheus (port 9090)
- Grafana (port 3001)
- Jaeger (port 16686)

Wait for all services to be healthy:

```bash
docker-compose ps
```

### 5. Run Database Migrations

```bash
npm run migrate
```

This creates all necessary tables and seeds initial data.

### 6. Start Development Servers

**Option A: Start everything**
```bash
npm run dev
```

**Option B: Start specific apps/services**
```bash
# Rider PWA
npm run dev:rider-pwa

# Auth Service
npm run dev:auth

# Dispatcher Web
npm run dev:dispatcher
```

### 7. Access Applications

- **Rider PWA**: http://localhost:3000
- **Dispatcher Web**: http://localhost:3002
- **Admin Portal**: http://localhost:3003
- **Auth Service**: http://localhost:4001
- **Grafana**: http://localhost:3001 (admin/admin)
- **Jaeger UI**: http://localhost:16686
- **MinIO Console**: http://localhost:9001 (minioadmin/minioadmin)

## Project Structure

```
riderguy/
├── apps/                    # Frontend applications
│   ├── rider-pwa/          # Rider Progressive Web App
│   ├── dispatcher-web/     # Dispatcher dashboard
│   └── admin-portal/       # Admin interface
├── services/                # Backend microservices
│   ├── auth-service/       # Authentication service
│   ├── rider-profile/      # Rider profile service
│   ├── task-order/         # Task/order service
│   └── ...                 # Other services
├── packages/                # Shared packages
│   ├── shared-types/       # TypeScript type definitions
│   ├── ui-components/      # Shared UI components
│   ├── utils/              # Common utilities
│   └── config/             # Shared configuration
├── infrastructure/          # Infrastructure code
│   ├── kubernetes/         # K8s manifests
│   ├── docker/             # Dockerfiles
│   ├── migrations/         # Database migrations
│   └── monitoring/         # Monitoring configs
└── docs/                   # Documentation
```

## Development Workflow

### Creating a New Feature

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code
   - Add tests
   - Update documentation

3. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation
   - `style:` formatting
   - `refactor:` code restructuring
   - `test:` adding tests
   - `chore:` maintenance

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style

We use:
- **ESLint** for linting
- **Prettier** for formatting
- **TypeScript** for type safety

Format your code before committing:
```bash
npm run format
```

### Testing

**Unit Tests**
```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

**E2E Tests**
```bash
npm run test:e2e
```

### Debugging

#### VS Code Launch Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Auth Service",
      "program": "${workspaceFolder}/services/auth-service/src/index.ts",
      "preLaunchTask": "npm: dev:auth",
      "outFiles": ["${workspaceFolder}/services/auth-service/dist/**/*.js"],
      "sourceMaps": true,
      "console": "integratedTerminal"
    }
  ]
}
```

#### Debugging with Chrome DevTools

Node.js services can be debugged with Chrome:

```bash
node --inspect-brk dist/index.js
```

Then open `chrome://inspect` in Chrome.

## Database

### Creating a Migration

```bash
npm run migrate:create -- add_new_column
```

This creates a new migration file in `infrastructure/migrations/`.

### Running Migrations

```bash
npm run migrate
```

### Rolling Back

```bash
npm run migrate:rollback
```

### Accessing the Database

```bash
# PostgreSQL
psql -h localhost -U postgres -d riderguy

# Redis
redis-cli

# MongoDB
mongosh mongodb://localhost:27017/riderguy
```

## API Testing

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Import collection from `docs/api/thunder-client-collection.json`
3. Set environment variables
4. Start testing!

### Using curl

```bash
# Login
curl -X POST http://localhost:4001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rider@example.com","password":"password123"}'

# Get profile (with token)
curl http://localhost:4001/api/v1/riders/uuid \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -ti:3000

# Kill process
kill -9 <PID>
```

### Docker Issues

```bash
# Clean up containers
docker-compose down -v

# Rebuild
docker-compose up --build -d
```

### Database Connection Errors

Check that PostgreSQL is running:
```bash
docker-compose ps postgres
```

Check connection:
```bash
psql -h localhost -U postgres -d riderguy
```

### Node Module Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Performance Profiling

### Node.js Profiling

```bash
node --prof dist/index.js
node --prof-process isolate-*.log > profile.txt
```

### React Profiler

Use React DevTools Profiler tab to analyze component rendering.

## Monitoring & Observability

### Viewing Metrics

1. Open Grafana: http://localhost:3001
2. Default credentials: admin/admin
3. Browse pre-configured dashboards

### Viewing Traces

1. Open Jaeger: http://localhost:16686
2. Select service from dropdown
3. Click "Find Traces"

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f postgres

# Service logs
tail -f services/auth-service/logs/combined.log
```

## Contributing

### Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from 2+ team members
6. Squash commits before merging

### Code Review Checklist

- [ ] Code follows style guide
- [ ] Tests added and passing
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] Error handling implemented
- [ ] Security considerations addressed
- [ ] Performance impact considered

## Resources

- [Architecture Documentation](../architecture/README.md)
- [API Documentation](../api/README.md)
- [Deployment Guide](./deployment.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

## Getting Help

- **Slack**: #riderguy-dev
- **Email**: dev@riderguy.io
- **Office Hours**: Tuesdays & Thursdays, 2-4 PM EST

## License

Proprietary - All rights reserved

---

Happy coding! 🚀
