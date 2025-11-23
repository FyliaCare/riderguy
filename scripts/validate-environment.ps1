# RiderGuy Environment Validation Script

param(
    [switch]$InstallMissing
)

Write-Host "`n🔍 RIDERGUY ENVIRONMENT VALIDATION`n" -ForegroundColor Cyan

$failed = $false

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion -match "v(\d+)") {
        $majorVersion = [int]$matches[1]
        if ($majorVersion -ge 20) {
            Write-Host "  ✅ Node.js $nodeVersion (OK)" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Node.js $nodeVersion (Need v20+)" -ForegroundColor Red
            $failed = $true
        }
    }
} catch {
    Write-Host "  ❌ Node.js not found" -ForegroundColor Red
    $failed = $true
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    Write-Host "  ✅ npm v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ npm not found" -ForegroundColor Red
    $failed = $true
}

# Check Go (optional for dispatch/telemetry services)
Write-Host "Checking Go..." -ForegroundColor Yellow
try {
    $goVersion = go version 2>$null
    Write-Host "  ✅ $goVersion" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️  Go not found (optional)" -ForegroundColor Yellow
}

# Check Python (optional for analytics service)
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>$null
    Write-Host "  ✅ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️  Python not found (optional)" -ForegroundColor Yellow
}

# Check PostgreSQL client
Write-Host "Checking PostgreSQL client..." -ForegroundColor Yellow
try {
    $null = psql --version 2>$null
    Write-Host "  ✅ PostgreSQL client installed" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️  PostgreSQL client not found (optional)" -ForegroundColor Yellow
}

# Check project structure
Write-Host "`nChecking project structure..." -ForegroundColor Yellow
$projectRoot = Split-Path -Parent $PSScriptRoot

$requiredDirs = @(
    "apps\\rider-pwa",
    "apps\\public-website",
    "apps\\admin-portal",
    "apps\\business-dashboard",
    "apps\\dispatcher-dashboard",
    "services\\auth-service",
    "services\\rider-profile-service",
    "services\\dispatch-service",
    "services\\analytics-service"
)

foreach ($dir in $requiredDirs) {
    $fullPath = Join-Path $projectRoot $dir
    if (Test-Path $fullPath) {
        Write-Host "  ✅ $dir" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $dir (missing)" -ForegroundColor Red
        $failed = $true
    }
}

# Check for package.json in services
Write-Host "`nChecking service configurations..." -ForegroundColor Yellow
$servicesDir = Join-Path $projectRoot "services"
Get-ChildItem -Path $servicesDir -Directory | ForEach-Object {
    $packageJson = Join-Path $_.FullName "package.json"
    if (Test-Path $packageJson) {
        $pkg = Get-Content $packageJson | ConvertFrom-Json
        if ($pkg.scripts.dev) {
            Write-Host "  ✅ $($_.Name) - has dev script" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  $($_.Name) - missing dev script" -ForegroundColor Yellow
        }
    } else {
        # Check if it's a Go or Python service
        $mainGo = Join-Path $_.FullName "main.go"
        $mainPy = Join-Path $_.FullName "main.py"
        if ((Test-Path $mainGo) -or (Test-Path $mainPy)) {
            Write-Host "  ✅ $($_.Name) - Go/Python service" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  $($_.Name) - no package.json or main file" -ForegroundColor Yellow
        }
    }
}

# Check for node_modules
Write-Host "`nChecking dependencies..." -ForegroundColor Yellow
$nodeModules = Join-Path $projectRoot "node_modules"
if (Test-Path $nodeModules) {
    Write-Host "  ✅ Root node_modules exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ Root node_modules missing" -ForegroundColor Red
    if ($InstallMissing) {
        Write-Host "  📦 Installing dependencies..." -ForegroundColor Cyan
        Push-Location $projectRoot
        npm install
        Pop-Location
    } else {
        Write-Host "  💡 Run: npm install" -ForegroundColor Yellow
        $failed = $true
    }
}

# Check environment variables
Write-Host "`nChecking environment variables..." -ForegroundColor Yellow
$requiredEnvVars = @("DATABASE_URL", "REDIS_URL", "JWT_SECRET")
$envFile = Join-Path $projectRoot ".env"

if (Test-Path $envFile) {
    Write-Host "  ✅ .env file exists" -ForegroundColor Green
    
    $envContent = Get-Content $envFile -Raw
    foreach ($envVar in $requiredEnvVars) {
        if ($envContent -match $envVar) {
            Write-Host "  ✅ $envVar defined" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  $envVar not found in .env" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "  ⚠️  .env file not found" -ForegroundColor Yellow
    Write-Host "  💡 Copy .env.example to .env and configure" -ForegroundColor Yellow
}

# Summary
Write-Host "`n" -NoNewline
if ($failed) {
    Write-Host "❌ VALIDATION FAILED" -ForegroundColor Red
    Write-Host "Fix the issues above before starting services.`n" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "✅ ENVIRONMENT VALIDATED" -ForegroundColor Green
    Write-Host "All checks passed! You can start services.`n" -ForegroundColor Green
    exit 0
}
