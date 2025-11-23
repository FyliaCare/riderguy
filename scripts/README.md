# RiderGuy Scripts

Comprehensive collection of scripts for managing the RiderGuy platform in development and production.

## Quick Start

### 🚀 Complete Setup and Start
```powershell
.\scripts\setup-and-start.ps1
```
This script:
- ✅ Validates environment (Node.js, npm, Go, Python)
- 📦 Installs all dependencies
- 🔧 Creates .env from .env.example if needed
- 🧹 Cleans up ports
- 🚀 Starts all services in background jobs
- 📊 Verifies services are running

### Options:
```powershell
# Only backend services
.\scripts\setup-and-start.ps1 -OnlyBackend

# Only frontend apps
.\scripts\setup-and-start.ps1 -OnlyFrontend

# Skip validation
.\scripts\setup-and-start.ps1 -SkipValidation

# Skip dependency installation
.\scripts\setup-and-start.ps1 -SkipInstall
```

## Environment Management

### ✅ Validate Environment
```powershell
.\scripts\validate-environment.ps1
```
Checks for:
- Node.js 20+
- npm 10+
- Go (optional)
- Python (optional)
- PostgreSQL client (optional)
- Project structure
- Service configurations
- .env file

With auto-install:
```powershell
.\scripts\validate-environment.ps1 -InstallMissing
```

### 🔍 Pre-flight Check (Comprehensive)
```powershell
.\scripts\preflight-check.ps1
```
Performs 40+ checks before deployment:
- System requirements
- Project structure
- Service configurations
- Docker files
- Environment variables
- Scripts
- Documentation
- Git status

## Service Management

### 🚀 Start All Services
```powershell
.\scripts\start-all.ps1
```
Starts all services (apps + backend) in background jobs.

Services started:
- **Backend (Ports 4001-4012):**
  - Auth Service (4001)
  - Rider Profile (4002)
  - Task Service (4003)
  - Wallet Service (4004)
  - Notification (4005)
  - Training (4006)
  - Community (4007)
  - XP Level (4008)
  - Welfare (4009)
  - Dispatch - Go (4010)
  - Telemetry - Go (4011)
  - Analytics - Python (4012)

- **Frontend (Ports 3000-5000):**
  - Rider PWA (3000)
  - Dispatcher Dashboard (3002)
  - Admin Portal (3003)
  - Business Dashboard (3300)
  - Public Website (5000)

### 🛑 Stop All Services
```powershell
.\scripts\stop-all.ps1
```
Stops:
- All background jobs
- All processes on service ports

### 📊 Check Service Status
```powershell
.\scripts\status.ps1
```
Shows real-time status of all services.

### 🏥 Health Check
```powershell
.\scripts\health-check.ps1
```
Checks health endpoints and database connectivity.

## Development

### 🔧 Start Development Mode
```powershell
.\scripts\start-dev.ps1
```
Starts services with:
- Hot reload enabled
- Development environment variables
- Verbose logging

## Database

### 🗄️ Setup Neon Database
```powershell
.\scripts\setup-neon.ps1
```
Interactive setup for Neon PostgreSQL:
- Creates project
- Sets up connection string
- Runs migrations
- Verifies connection

## Deployment

### 🚀 Deploy to Render
```powershell
.\scripts\deploy.ps1
```
Automated deployment to Render using:
- Blueprint (render.yaml)
- Render API
- Environment variables from .env

Requires:
- `RENDER_API_KEY` in .env
- Blueprint in `render.yaml`

## Monitoring

### 📈 System Overview
```powershell
.\scripts\system-overview.js
```
Displays:
- Service architecture
- Port mappings
- Technology stack
- Dependencies

## PowerShell Job Management

### View Running Jobs
```powershell
Get-Job
```

### View Job Output
```powershell
# Specific service
Get-Job -Name "Auth Service" | Receive-Job

# All failed jobs
Get-Job | Where-Object { $_.State -eq 'Failed' } | Receive-Job

# All jobs
Get-Job | Receive-Job
```

### Stop Specific Job
```powershell
Stop-Job -Name "Auth Service"
Remove-Job -Name "Auth Service"
```

### Stop All Jobs
```powershell
Get-Job | Stop-Job
Get-Job | Remove-Job
```

## Troubleshooting

### Port Already in Use
```powershell
# Check what's using a port
netstat -ano | findstr ":3000"

# Kill process by PID
Stop-Process -Id <PID> -Force

# Or use stop-all.ps1
.\scripts\stop-all.ps1
```

### Service Failed to Start
```powershell
# Check job state
Get-Job | Select-Object Name, State

# View error logs
Get-Job -Name "Service Name" | Receive-Job

# Check if dependencies installed
Set-Location "services/service-name"
npm install

# Check if port is available
netstat -ano | findstr ":PORT"
```

### Missing Dependencies
```powershell
# Install all dependencies
npm install

# Or use setup script
.\scripts\setup-and-start.ps1
```

### Environment Variables Not Set
```powershell
# Check .env exists
Test-Path .env

# Create from example
Copy-Item .env.example .env

# Edit .env
notepad .env
```

## Environment Variables

All scripts respect these environment variables:

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret

### Optional
- `NODE_ENV` - Environment (development/production)
- `PORT` - Override default service port
- `LOG_LEVEL` - Logging level (debug/info/warn/error)

### Service-Specific
See `.env.example` for complete list.

## CI/CD Integration

Scripts are designed for CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Validate Environment
  run: .\scripts\validate-environment.ps1

- name: Install Dependencies
  run: npm ci

- name: Run Tests
  run: npm test

- name: Deploy
  run: .\scripts\deploy.ps1
  env:
    RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
```

## Script Dependencies

| Script | Requires | Optional |
|--------|----------|----------|
| validate-environment.ps1 | PowerShell 5.1+ | - |
| setup-and-start.ps1 | Node.js 20+, npm | Go, Python |
| start-all.ps1 | Node.js 20+ | Go, Python |
| stop-all.ps1 | PowerShell 5.1+ | - |
| setup-neon.ps1 | PowerShell 5.1+ | psql |
| deploy.ps1 | PowerShell 5.1+, Render API Key | - |
| health-check.ps1 | PowerShell 5.1+ | psql |
| preflight-check.ps1 | Node.js 20+ | Go, Python, Docker |

## Best Practices

1. **Always validate before starting:**
   ```powershell
   .\scripts\validate-environment.ps1
   .\scripts\setup-and-start.ps1
   ```

2. **Check status regularly:**
   ```powershell
   .\scripts\status.ps1
   ```

3. **View logs when debugging:**
   ```powershell
   Get-Job | Receive-Job
   ```

4. **Clean stop before restarting:**
   ```powershell
   .\scripts\stop-all.ps1
   .\scripts\start-all.ps1
   ```

5. **Run preflight check before deployment:**
   ```powershell
   .\scripts\preflight-check.ps1
   ```

## Platform Requirements

- **Windows:** PowerShell 5.1+ (built-in) or PowerShell 7+
- **macOS/Linux:** PowerShell 7+ (cross-platform)
- **Node.js:** 20.0.0 or higher
- **npm:** 10.0.0 or higher
- **Go:** 1.21+ (optional, for dispatch/telemetry)
- **Python:** 3.11+ (optional, for analytics)

## Support

For issues with scripts:
1. Check script output for error messages
2. Run `validate-environment.ps1` to check setup
3. View job logs with `Get-Job | Receive-Job`
4. Check GitHub Issues: https://github.com/FyliaCare/riderguy/issues

## Contributing

When adding new scripts:
1. Follow PowerShell best practices
2. Add parameter validation
3. Include error handling
4. Add to this README
5. Test on Windows PowerShell 5.1 and PowerShell 7

## License

See LICENSE file in project root.
