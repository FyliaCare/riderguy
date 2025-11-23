# 🚀 Deploy RiderGuy to Render - Quick Start

## Prerequisites Checklist

- ✅ Code pushed to GitHub: https://github.com/FyliaCare/riderguy
- ⬜ Render account created: https://render.com
- ⬜ Neon database created: https://neon.tech

---

## Step 1: Create Neon Database (5 minutes)

### 1.1 Sign up and Create Project

1. Go to **https://console.neon.tech/**
2. Click **"New Project"**
3. Settings:
   - Name: `riderguy-production`
   - Region: **US East (Ohio)** or closest to your users
   - PostgreSQL: **15** or higher
4. Click **"Create Project"**

### 1.2 Get Your Connection String

1. In dashboard, click **"Connection Details"**
2. Copy the connection string (looks like):
   ```
   postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/riderguy?sslmode=require
   ```
3. **SAVE THIS** - you'll need it in Step 2

### 1.3 Enable Extensions (Optional but Recommended)

1. Go to **"SQL Editor"** in Neon
2. Run this SQL:
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE EXTENSION IF NOT EXISTS "pg_trgm";
   ```

---

## Step 2: Deploy to Render with Blueprint (10 minutes)

### 2.1 Connect GitHub to Render

1. Go to **https://dashboard.render.com/**
2. Sign up/Login (use GitHub OAuth for easy setup)
3. Render will ask to access your GitHub - **Allow**

### 2.2 Deploy Using Blueprint

1. In Render Dashboard, click **"New +"** → **"Blueprint"**
2. Connect your repository:
   - Search for: **FyliaCare/riderguy**
   - Click **"Connect"**
3. Render will detect `render.yaml` automatically
4. Click **"Apply"**

### 2.3 What Render Will Create

Render will automatically create **14 services**:

**Frontend Apps (5):**
- Rider PWA (Next.js) - Port 10000
- Public Website (Next.js) - Port 10001  
- Dispatcher Dashboard (Vite) - Port 10002
- Admin Portal (Vite) - Port 10003
- Business Dashboard (Vite) - Port 10004

**Backend Services (8):**
- Auth Service - Port 10005
- Rider Profile Service - Port 10006
- Notification Service - Port 10007
- Wallet Service - Port 10008
- Community Service - Port 10009
- XP Level Service - Port 10010
- Dispatch Service (Go) - Port 10011
- Analytics Service (Python) - Port 10012

**Cache:**
- Redis (Private Service)

### 2.4 Initial Build Status

- All services will start building automatically
- **First build takes 10-15 minutes**
- Services will show **"Build in progress"** status

---

## Step 3: Configure Environment Variables (15 minutes)

### 3.1 Critical Variables (Required for All Services)

For **EACH service**, go to service → **Environment** tab → Add these:

#### Database & Cache
```bash
DATABASE_URL=postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/riderguy?sslmode=require
REDIS_URL=redis://red-xxxxx:6379  # Auto-filled by Render Redis service
```

#### Authentication
```bash
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-change-this
SESSION_SECRET=your-session-secret-minimum-32-characters-change-this
```

#### Environment
```bash
NODE_ENV=production
```

### 3.2 Frontend-Specific Variables

For **Rider PWA** and **Public Website**:
```bash
NEXT_PUBLIC_API_URL=https://riderguy-auth-service.onrender.com
NEXT_PUBLIC_APP_URL=https://riderguy-rider-pwa.onrender.com
```

For **Vite Apps** (Dispatcher, Admin, Business):
```bash
VITE_API_URL=https://riderguy-auth-service.onrender.com
```

### 3.3 Optional but Recommended

```bash
# Notifications
SENDGRID_API_KEY=your-sendgrid-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token

# Payments
STRIPE_SECRET_KEY=sk_test_your-stripe-key
```

### 3.4 Quick Copy Template

Save this template and fill in your values:

```bash
# COPY THIS TO EACH SERVICE IN RENDER

# Database & Cache
DATABASE_URL=YOUR_NEON_CONNECTION_STRING_HERE
REDIS_URL=redis://red-xxxxx:6379

# Security (CHANGE THESE!)
JWT_SECRET=GENERATE_A_RANDOM_32_CHAR_STRING_HERE
SESSION_SECRET=GENERATE_ANOTHER_RANDOM_32_CHAR_STRING

# Environment
NODE_ENV=production
```

---

## Step 4: Run Database Migrations (5 minutes)

### 4.1 Using Render Shell

1. Go to any backend service (e.g., **Auth Service**)
2. Click **"Shell"** tab
3. Run migrations:
   ```bash
   cd /opt/render/project/src
   npm run migrate
   ```

### 4.2 Manual Migration (If npm script doesn't exist)

1. Connect to Neon SQL Editor: https://console.neon.tech
2. Run the migration files:
   - `infrastructure/migrations/001_initial_schema.sql`
   - `infrastructure/migrations/002_timescale_telemetry.sql`

---

## Step 5: Verify Deployment (5 minutes)

### 5.1 Check Service Health

Go to each service in Render and check:
- ✅ Status shows **"Live"** (green)
- ✅ No build errors in **"Logs"** tab
- ✅ Health check passing (if configured)

### 5.2 Test Endpoints

Open these URLs (replace with your actual Render URLs):

```bash
# Frontend
https://riderguy-rider-pwa.onrender.com
https://riderguy-public-website.onrender.com
https://riderguy-admin-portal.onrender.com

# Backend Health Checks
https://riderguy-auth-service.onrender.com/api/health
https://riderguy-rider-profile-service.onrender.com/api/health
```

### 5.3 Expected Response

Health endpoint should return:
```json
{
  "service": "auth-service",
  "status": "healthy",
  "timestamp": "2025-11-23T...",
  "uptime": 123.45
}
```

---

## Step 6: Custom Domains (Optional)

### 6.1 Add Your Domain

For each service you want to expose:

1. Go to service → **Settings** tab
2. Scroll to **"Custom Domain"**
3. Click **"Add Custom Domain"**
4. Enter your domain: `app.yourdomain.com`
5. Follow DNS setup instructions

### 6.2 Recommended Domain Setup

```bash
app.riderguy.com          → Rider PWA
www.riderguy.com          → Public Website
admin.riderguy.com        → Admin Portal
dispatch.riderguy.com     → Dispatcher Dashboard
business.riderguy.com     → Business Dashboard
api.riderguy.com          → API Gateway (future)
```

---

## Troubleshooting

### Services Failing to Start

1. **Check Logs**: Go to service → **"Logs"** tab
2. **Common Issues**:
   - Missing environment variables
   - Database connection failed
   - Port conflicts (shouldn't happen on Render)

### Build Failures

1. **Check Build Command**: Make sure `render.yaml` has correct paths
2. **Dependencies**: Run `npm install` in root first
3. **Node Version**: Render uses Node 18 by default, we need 20+
   - Add to service: `Environment` → `NODE_VERSION=20`

### Database Connection Errors

1. **Verify Connection String**: Must include `?sslmode=require`
2. **IP Allowlist**: Neon allows all by default, but check settings
3. **Test Connection**: Use Neon SQL Editor to verify database is accessible

### Slow First Load

- Render free tier spins down after inactivity
- First request after idle takes 30-60 seconds
- Upgrade to paid tier for persistent instances

---

## Post-Deployment Checklist

- ⬜ All services show **"Live"** status
- ⬜ Health endpoints responding
- ⬜ Database migrations completed
- ⬜ Environment variables configured
- ⬜ Frontend apps accessible
- ⬜ API endpoints working
- ⬜ Custom domains configured (optional)
- ⬜ Monitoring enabled (Render provides basic monitoring)

---

## Quick Commands

### Generate Random Secrets
```bash
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### Check All Service Health
```bash
# Save as check-health.ps1
$services = @(
    "https://riderguy-auth-service.onrender.com/api/health",
    "https://riderguy-rider-profile-service.onrender.com/api/health"
)

foreach ($url in $services) {
    try {
        $response = Invoke-RestMethod -Uri $url
        Write-Host "✅ $url - OK" -ForegroundColor Green
    } catch {
        Write-Host "❌ $url - FAILED" -ForegroundColor Red
    }
}
```

---

## Costs Estimate

### Free Tier (Good for Testing)
- **Render**: 750 hours/month free (can run 1 service 24/7)
- **Neon**: 3 projects, 3GB storage, 5 compute hours/day
- **Redis**: Render provides 25MB free Redis
- **Total**: $0/month

### Production Tier (Recommended)
- **Render**: $7/month per service (14 services = $98/month)
- **Neon**: $19/month (includes 10 compute hours/day)
- **Redis**: Render Redis Pro $10/month
- **Total**: ~$127/month

### Alternative: Start Small
Deploy only critical services:
1. Rider PWA
2. Auth Service
3. Rider Profile Service
4. Notification Service

**Cost**: ~$28/month (4 services + Neon)

---

## Next Steps

1. **Monitor**: Set up alerts in Render dashboard
2. **Scale**: Upgrade services based on traffic
3. **Backup**: Configure Neon backups (automatic on paid tier)
4. **CI/CD**: GitHub Actions already configured (`.github/workflows/ci-cd.yml`)
5. **Documentation**: Update API docs with production URLs

---

## Support

- **Render Docs**: https://render.com/docs
- **Neon Docs**: https://neon.tech/docs
- **GitHub Issues**: https://github.com/FyliaCare/riderguy/issues

**Deployment Time**: ~30-40 minutes total
**Status**: Ready to deploy! 🚀
