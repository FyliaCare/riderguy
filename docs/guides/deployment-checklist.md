# RiderGuy Platform - Deployment Checklist

## Pre-Deployment

### Code & Repository
- [ ] All tests passing (`npm run test`)
- [ ] Lint checks passing (`npm run lint`)
- [ ] Type checks passing (`npm run type-check`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Code committed to Git
- [ ] Pushed to GitHub (`git push origin main`)
- [ ] No secrets in codebase (check `.env` files)

### Documentation
- [ ] README updated
- [ ] API documentation current
- [ ] Environment variables documented
- [ ] Deployment guide reviewed

---

## Neon Database Setup

### Account & Project
- [ ] Neon account created (https://neon.tech)
- [ ] Project created: `riderguy-production`
- [ ] Region selected (closest to users)
- [ ] PostgreSQL 15+ selected

### Database Configuration
- [ ] Connection string copied
- [ ] Connection pooling enabled
- [ ] Auto-scaling configured
- [ ] Extensions enabled:
  - [ ] `uuid-ossp`
  - [ ] `postgis` (if using location features)
  - [ ] `pg_trgm` (for fuzzy search)

### Databases Created
- [ ] Main database: `riderguy`
- [ ] Telemetry database: `riderguy_telemetry` (optional)

### Migrations
- [ ] Migrations tested locally
- [ ] Schema scripts ready (`infrastructure/migrations/*.sql`)
- [ ] Seed data prepared (if needed)

---

## Render Setup

### Account
- [ ] Render account created (https://render.com)
- [ ] GitHub connected
- [ ] Payment method added (for paid plans)
- [ ] Team invited (if applicable)

### Redis Cache
- [ ] Redis private service created
- [ ] 1 GB disk attached
- [ ] Connection string saved

### Environment Variables Prepared
Generate all required secrets:
- [ ] `JWT_SECRET` (run: `openssl rand -base64 32`)
- [ ] `JWT_REFRESH_SECRET` (run: `openssl rand -base64 32`)
- [ ] `SESSION_SECRET` (run: `openssl rand -base64 32`)
- [ ] `ENCRYPTION_KEY` (run: `openssl rand -hex 32`)

---

## Service Deployments

### Rider PWA (Next.js)
- [ ] Service created on Render
- [ ] Build command configured
- [ ] Start command configured
- [ ] Environment variables set:
  - [ ] `NODE_ENV=production`
  - [ ] `DATABASE_URL` (from Neon)
  - [ ] `REDIS_URL` (from Render Redis)
  - [ ] `NEXT_PUBLIC_API_URL`
  - [ ] `NEXT_PUBLIC_MAPBOX_TOKEN`
- [ ] Health check configured: `/api/health`
- [ ] Deployment successful
- [ ] Service accessible

### Auth Service (Node.js)
- [ ] Service created on Render
- [ ] Build & start commands configured
- [ ] Environment variables set:
  - [ ] `PORT=4001`
  - [ ] `DATABASE_URL`
  - [ ] `REDIS_URL`
  - [ ] `JWT_SECRET`
  - [ ] `JWT_REFRESH_SECRET`
- [ ] Health check: `/health`
- [ ] Deployment successful
- [ ] API responding

### Rider Profile Service
- [ ] Service deployed
- [ ] Environment variables set
- [ ] Health check passing
- [ ] Connected to Neon DB

### Dispatch Service (Go)
- [ ] Service deployed
- [ ] Go build successful
- [ ] Environment variables set
- [ ] Health check passing

### Notification Service
- [ ] Service deployed
- [ ] Third-party credentials set:
  - [ ] `TWILIO_ACCOUNT_SID`
  - [ ] `TWILIO_AUTH_TOKEN`
  - [ ] `SENDGRID_API_KEY`
  - [ ] `FIREBASE_SERVER_KEY`
- [ ] Health check passing

### Wallet Service
- [ ] Service deployed
- [ ] Payment gateway credentials set:
  - [ ] `FLUTTERWAVE_SECRET_KEY`
  - [ ] `PAYSTACK_SECRET_KEY`
- [ ] Health check passing

### Community Service
- [ ] Service deployed
- [ ] Environment variables set
- [ ] Health check passing

### XP Level Service
- [ ] Service deployed
- [ ] Environment variables set
- [ ] Health check passing

### Analytics Service (Python)
- [ ] Service deployed
- [ ] Python dependencies installed
- [ ] Health check passing

---

## Database Migrations

### Schema Deployment
- [ ] Connect to Neon database
- [ ] Run initial schema migration:
  ```bash
  psql $DATABASE_URL -f infrastructure/migrations/001_initial_schema.sql
  ```
- [ ] Run telemetry migration (if applicable):
  ```bash
  psql $TIMESCALE_URL -f infrastructure/migrations/002_timescale_telemetry.sql
  ```
- [ ] Verify tables created:
  ```sql
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public';
  ```

### Data Seeding (Optional)
- [ ] Admin user created
- [ ] Initial configurations loaded
- [ ] Test data removed (production only)

---

## Frontend Apps

### Dispatcher Dashboard
- [ ] Service deployed
- [ ] Build successful
- [ ] Environment variables set
- [ ] Accessible at URL

### Admin Portal
- [ ] Service deployed
- [ ] Build successful
- [ ] Environment variables set
- [ ] Accessible at URL

### Business Dashboard
- [ ] Service deployed
- [ ] Build successful
- [ ] Environment variables set
- [ ] Accessible at URL

### Public Website
- [ ] Service deployed
- [ ] Build successful
- [ ] Environment variables set
- [ ] Accessible at URL

---

## Integration Testing

### Service Communication
- [ ] Auth service → Database connection working
- [ ] Services can communicate with each other
- [ ] Redis cache working
- [ ] Event streaming operational (if using Kafka)

### API Endpoints
Test critical endpoints:
- [ ] `POST /api/auth/register` - User registration
- [ ] `POST /api/auth/login` - User login
- [ ] `GET /api/riders/profile` - Get rider profile
- [ ] `POST /api/tasks/create` - Create task
- [ ] `GET /api/health` - Health checks (all services)

### External Services
- [ ] Mapbox maps loading
- [ ] SMS notifications sending (Twilio)
- [ ] Email notifications sending (SendGrid)
- [ ] Push notifications working (Firebase)
- [ ] Payment processing working (Flutterwave/Paystack)

---

## Security Configuration

### SSL/HTTPS
- [ ] Render automatic SSL enabled
- [ ] All services use HTTPS
- [ ] Mixed content warnings resolved

### Environment Variables
- [ ] All secrets in environment variables (not code)
- [ ] `.env` files in `.gitignore`
- [ ] Sensitive data encrypted at rest

### Database Security
- [ ] Neon connection uses SSL (`?sslmode=require`)
- [ ] Database user has minimal permissions
- [ ] Connection pooling enabled

### API Security
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] JWT validation working
- [ ] XSS protection headers set
- [ ] CSRF protection enabled

---

## Performance & Monitoring

### Caching
- [ ] Redis cache configured
- [ ] Cache warming implemented (if needed)
- [ ] Cache invalidation working

### Database Optimization
- [ ] Indexes created on frequently queried columns
- [ ] Query performance tested
- [ ] Connection pooling enabled
- [ ] Slow query logging configured

### Monitoring Tools
- [ ] Render logs accessible
- [ ] Neon metrics dashboard reviewed
- [ ] Error tracking setup (Sentry - optional)
- [ ] Uptime monitoring configured (optional)

### Performance Testing
- [ ] Load testing completed
- [ ] Response times acceptable (<200ms for API)
- [ ] Database queries optimized
- [ ] Bundle sizes acceptable (<500KB for apps)

---

## Custom Domains (Optional)

### Domain Configuration
- [ ] Domain purchased
- [ ] DNS provider accessible
- [ ] CNAME records added:
  ```
  app.riderguy.com → riderguy-rider-pwa.onrender.com
  api.riderguy.com → riderguy-auth-service.onrender.com
  admin.riderguy.com → riderguy-admin-portal.onrender.com
  ```
- [ ] SSL certificates issued (automatic)
- [ ] Domains resolving correctly

---

## Post-Deployment

### Verification
- [ ] All services healthy (check `/health` endpoints)
- [ ] Frontend apps loading
- [ ] User registration working
- [ ] Login/logout working
- [ ] Core features functional

### Documentation
- [ ] Deployment documented
- [ ] Service URLs documented
- [ ] Credentials securely stored
- [ ] Runbook created for common issues

### Team Communication
- [ ] Team notified of deployment
- [ ] Service URLs shared
- [ ] Access credentials distributed (securely)
- [ ] Deployment notes shared

### Backup & Recovery
- [ ] Database backup strategy defined
- [ ] Neon point-in-time recovery tested
- [ ] Recovery procedure documented
- [ ] Backup schedule configured

---

## Ongoing Maintenance

### Monitoring
- [ ] Daily health checks scheduled
- [ ] Alert notifications configured
- [ ] Log rotation enabled
- [ ] Metrics dashboard bookmarked

### Updates
- [ ] Dependency update schedule defined
- [ ] Security patch process established
- [ ] Deployment rollback procedure tested

### Costs
- [ ] Resource usage monitored
- [ ] Budget alerts configured
- [ ] Cost optimization opportunities identified
- [ ] Billing reviewed monthly

---

## Rollback Plan

In case of critical issues:

1. **Identify Issue**:
   - Check Render logs
   - Check Neon metrics
   - Review error tracking

2. **Quick Rollback**:
   ```bash
   # In Render dashboard
   # Go to service → Deploys → Previous deploy → "Rollback"
   ```

3. **Database Rollback**:
   ```bash
   # Neon point-in-time restore
   # Console → Project → Branches → "Restore"
   ```

4. **Notify Stakeholders**:
   - Team notification
   - User communication (if needed)
   - Post-mortem scheduled

---

## Success Criteria

Deployment is successful when:
- [ ] All services healthy and responding
- [ ] Zero critical errors in logs
- [ ] User flows working end-to-end
- [ ] Performance metrics acceptable
- [ ] Security checks passing
- [ ] Team has access to all systems
- [ ] Documentation complete

---

## Support Contacts

- **Render Support**: https://render.com/docs
- **Neon Support**: https://neon.tech/docs
- **Team Lead**: [Your contact]
- **DevOps**: [Your contact]

---

## Notes

Add any deployment-specific notes here:

```
Date: _____________
Deployed by: _____________
Version/Tag: _____________
Issues encountered: _____________
Resolution: _____________
```

---

**Last Updated**: November 23, 2025  
**Version**: 1.0.0
