# RiderGuy Platform - Deployment Guide

## Overview

This guide covers deploying the RiderGuy platform to production using:
- **Render** - Frontend apps and backend services
- **Neon** - PostgreSQL database (serverless)
- **Redis Cloud** - Redis cache and queues

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Neon Database Setup](#neon-database-setup)
3. [Render Deployment](#render-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Migrations](#database-migrations)
6. [Monitoring & Logs](#monitoring--logs)
7. [Custom Domain Setup](#custom-domain-setup)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
1. **GitHub Account** - For repository hosting
2. **Render Account** - https://render.com (free tier available)
3. **Neon Account** - https://neon.tech (free tier available)
4. **Redis Cloud** - https://redis.com/cloud (optional, Render provides Redis)

### Required Tools
- Git
- Node.js 20+
- npm 10+

---

## Neon Database Setup

### 1. Create Neon Project

1. Go to https://console.neon.tech/
2. Click **"New Project"**
3. Configure:
   - **Name**: `riderguy-production`
   - **Region**: Choose closest to your users (e.g., US East)
   - **PostgreSQL Version**: 15+
4. Click **"Create Project"**

### 2. Get Connection String

1. In your Neon project dashboard, click **"Connection Details"**
2. Copy the connection string (it looks like):
   ```
   postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/riderguy?sslmode=require
   ```
3. Save this - you'll need it for Render

### 3. Create Additional Databases (Optional)

If you want separate databases for telemetry:

```sql
-- Connect to Neon SQL Editor
CREATE DATABASE riderguy_telemetry;
```

### 4. Enable Required Extensions

```sql
-- In Neon SQL Editor
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

### 5. Neon Features to Enable

- **Auto-scaling**: Enabled by default
- **Branching**: For staging/preview environments
- **Connection Pooling**: Recommended for high traffic

---

## Render Deployment

### Option 1: Deploy via Blueprint (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Create Render Account**:
   - Go to https://dashboard.render.com
   - Sign up with GitHub

3. **Deploy via Blueprint**:
   - Click **"New"** → **"Blueprint"**
   - Connect your GitHub repository
   - Select `render.yaml` file
   - Click **"Apply"**

4. **Configure Environment Variables**:
   - Render will prompt for sensitive variables
   - Add your Neon `DATABASE_URL`
   - Add API keys (Mapbox, Twilio, etc.)

### Option 2: Deploy Individual Services

#### Deploy Rider PWA (Next.js)

1. In Render Dashboard, click **"New"** → **"Web Service"**
2. Connect GitHub repository
3. Configure:
   - **Name**: `riderguy-rider-pwa`
   - **Environment**: `Node`
   - **Region**: `Oregon (US West)`
   - **Branch**: `main`
   - **Build Command**: 
     ```bash
     cd apps/rider-pwa && npm install && npm run build
     ```
   - **Start Command**: 
     ```bash
     cd apps/rider-pwa && npm start
     ```
   - **Plan**: `Starter` (Free)

4. Add Environment Variables:
   ```
   NODE_ENV=production
   DATABASE_URL=<your-neon-connection-string>
   NEXT_PUBLIC_API_URL=https://riderguy-auth-service.onrender.com
   NEXT_PUBLIC_MAPBOX_TOKEN=<your-mapbox-token>
   ```

5. Click **"Create Web Service"**

#### Deploy Auth Service (Node.js)

1. Click **"New"** → **"Web Service"**
2. Configure:
   - **Name**: `riderguy-auth-service`
   - **Environment**: `Node`
   - **Build Command**: 
     ```bash
     cd services/auth-service && npm install && npm run build
     ```
   - **Start Command**: 
     ```bash
     cd services/auth-service && npm start
     ```

3. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=4001
   DATABASE_URL=<your-neon-connection-string>
   JWT_SECRET=<generate-secure-secret>
   JWT_REFRESH_SECRET=<generate-secure-secret>
   REDIS_URL=<your-redis-url>
   ```

4. Click **"Create Web Service"**

#### Deploy Dispatch Service (Go)

1. Click **"New"** → **"Web Service"**
2. Configure:
   - **Name**: `riderguy-dispatch-service`
   - **Environment**: `Go`
   - **Build Command**: 
     ```bash
     cd services/dispatch-service && go build -o bin/dispatch-service
     ```
   - **Start Command**: 
     ```bash
     cd services/dispatch-service && ./bin/dispatch-service
     ```

3. Add Environment Variables:
   ```
   GO_ENV=production
   PORT=4004
   DATABASE_URL=<your-neon-connection-string>
   ```

#### Deploy Analytics Service (Python)

1. Click **"New"** → **"Web Service"**
2. Configure:
   - **Name**: `riderguy-analytics-service`
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```bash
     cd services/analytics-service && pip install -r requirements.txt
     ```
   - **Start Command**: 
     ```bash
     cd services/analytics-service && uvicorn main:app --host 0.0.0.0 --port $PORT
     ```

### Deploy Redis (Private Service)

1. Click **"New"** → **"Private Service"**
2. Configure:
   - **Name**: `riderguy-redis`
   - **Environment**: `Docker`
   - **Image**: `redis:7-alpine`
   - **Add Disk**: 
     - Name: `redis-data`
     - Mount Path: `/data`
     - Size: `1 GB`

---

## Environment Variables

### Required Variables for All Services

```bash
# Production Environment
NODE_ENV=production
PORT=<service-port>

# Neon Database
DATABASE_URL=postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/riderguy?sslmode=require

# Redis (from Render Redis service)
REDIS_URL=redis://red-xxxxx:6379

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_SECRET=<your-secret>
JWT_REFRESH_SECRET=<your-refresh-secret>
```

### Service-Specific Variables

#### Rider PWA
```bash
NEXT_PUBLIC_API_URL=https://riderguy-auth-service.onrender.com
NEXT_PUBLIC_APP_URL=https://riderguy-rider-pwa.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxxxx
```

#### Notification Service
```bash
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
SENDGRID_API_KEY=SG.xxxxx
FIREBASE_SERVER_KEY=xxxxx
```

#### Wallet Service
```bash
FLUTTERWAVE_SECRET_KEY=FLWSECK-xxxxx
FLUTTERWAVE_ENCRYPTION_KEY=xxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxx
```

### Generate Secrets

```bash
# JWT Secret
openssl rand -base64 32

# Session Secret
openssl rand -base64 32

# Encryption Key
openssl rand -hex 32
```

---

## Database Migrations

### Run Migrations on Neon

1. **Install Neon CLI** (optional):
   ```bash
   npm install -g neonctl
   neonctl auth
   ```

2. **Run Migrations Locally Against Neon**:
   ```bash
   # Set environment variable
   export DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/riderguy?sslmode=require"
   
   # Run migrations
   npm run migrate
   ```

3. **Via Render Shell**:
   - Go to your service in Render
   - Click **"Shell"** tab
   - Run:
     ```bash
     cd infrastructure
     npx prisma migrate deploy
     # or your migration command
     ```

### Initial Schema Setup

```sql
-- Run in Neon SQL Editor or via psql
\i infrastructure/migrations/001_initial_schema.sql
\i infrastructure/migrations/002_timescale_telemetry.sql
```

---

## Monitoring & Logs

### Render Logs

1. **View Logs**:
   - Go to service in Render Dashboard
   - Click **"Logs"** tab
   - Real-time streaming logs

2. **Download Logs**:
   - Click **"Download"** button
   - Exports last 10,000 lines

### Neon Monitoring

1. **Connection Pooling**:
   - Dashboard → Project → **"Connection Pooling"**
   - Monitor active connections

2. **Metrics**:
   - Database size
   - Query performance
   - Connection count

### Health Checks

Each service exposes `/health` endpoint:

```bash
# Check service health
curl https://riderguy-auth-service.onrender.com/health

# Expected response
{
  "status": "ok",
  "timestamp": "2025-11-23T12:00:00Z",
  "database": "connected",
  "redis": "connected"
}
```

---

## Custom Domain Setup

### 1. Add Domain in Render

1. Go to service → **"Settings"** → **"Custom Domain"**
2. Click **"Add Custom Domain"**
3. Enter: `app.riderguy.com`

### 2. Configure DNS

Add CNAME record in your DNS provider:

```
Type: CNAME
Name: app
Value: riderguy-rider-pwa.onrender.com
TTL: 3600
```

### 3. Enable HTTPS

Render automatically provisions SSL certificates via Let's Encrypt.

---

## Scaling & Performance

### Auto-Scaling (Paid Plans)

1. Go to service → **"Settings"** → **"Scaling"**
2. Configure:
   - Min Instances: `1`
   - Max Instances: `10`
   - CPU Threshold: `70%`

### Neon Auto-Scaling

- Automatically scales compute based on load
- Pauses after 5 minutes of inactivity (free tier)
- Wakes up automatically on new connections

### Redis Scaling

- Use Redis Cloud for larger cache
- Enable persistence for data durability

---

## CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Render
        env:
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
        run: |
          curl -X POST \
            "https://api.render.com/v1/services/$SERVICE_ID/deploys" \
            -H "Authorization: Bearer $RENDER_API_KEY"
```

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Timeout

**Problem**: Service can't connect to Neon

**Solution**:
```bash
# Check connection string includes ?sslmode=require
DATABASE_URL=postgresql://...?sslmode=require

# Verify IP not blocked (Neon allows all IPs by default)
# Check Neon project is active (free tier auto-suspends)
```

#### 2. Build Failures

**Problem**: `npm install` fails on Render

**Solution**:
```bash
# Clear build cache
# In Render: Settings → Build & Deploy → Clear Build Cache

# Check Node version matches locally
# Update engines in package.json:
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

#### 3. High Memory Usage

**Problem**: Service crashes with OOM errors

**Solution**:
- Upgrade to paid plan (more RAM)
- Optimize queries (add indexes)
- Enable connection pooling in Neon

#### 4. Slow First Request

**Problem**: First request after inactivity is slow

**Solution**:
- Keep service warm with health check pings
- Use Render paid plan (no spin-down)
- Neon paid tier (no auto-suspend)

### Health Check Debugging

```bash
# Test locally first
npm run dev

# Test health endpoint
curl http://localhost:4001/health

# Check logs for errors
cd services/auth-service
npm run logs
```

---

## Cost Optimization

### Free Tier Limits

**Render Free**:
- 750 hours/month per service
- Spins down after 15 min inactivity
- 512 MB RAM

**Neon Free**:
- 3 GB storage
- 100 hours compute/month
- Auto-suspend after 5 min

### Recommendations

1. **Use Blueprint**: Deploy all services at once
2. **Enable Auto-Suspend**: For staging environments
3. **Monitor Usage**: Track compute hours
4. **Optimize Queries**: Reduce database load
5. **Cache Aggressively**: Use Redis for frequent reads

---

## Production Checklist

- [ ] Neon database created and configured
- [ ] All services deployed on Render
- [ ] Redis cache deployed
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Health checks passing
- [ ] Custom domains configured
- [ ] SSL certificates active
- [ ] Monitoring enabled
- [ ] Backup strategy defined
- [ ] Error tracking setup (Sentry)
- [ ] Load testing completed
- [ ] Documentation updated

---

## Next Steps

1. **Set up staging environment**:
   - Use Neon branching for staging DB
   - Deploy separate Render services

2. **Configure CDN**:
   - Cloudflare for static assets
   - Edge caching for API responses

3. **Implement monitoring**:
   - Sentry for error tracking
   - LogRocket for session replay
   - Uptime monitoring (UptimeRobot)

4. **Security hardening**:
   - Enable rate limiting
   - Set up WAF rules
   - Regular security audits

---

## Support

- **Render**: https://render.com/docs
- **Neon**: https://neon.tech/docs
- **RiderGuy**: docs@riderguy.com
