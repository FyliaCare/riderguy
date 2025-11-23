# RiderGuy Environment Validation Script

param(
    [switch]$InstallMissing
)

Write-Host "`n🔍 RIDERGUY ENVIRONMENT VALIDATION`n" -ForegroundColor Cyan

$failed = $false
$projectRoot = Split-Path -Parent $PSScriptRoot

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

# Check project structure
Write-Host "`nChecking project structure..." -ForegroundColor Yellow
$requiredDirs = @(
    "apps\\rider-pwa",
    "apps\\public-website",
    "services\\auth-service",
    "services\\dispatch-service"
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
$envFile = Join-Path $projectRoot ".env"

if (Test-Path $envFile) {
    Write-Host "  ✅ .env file exists" -ForegroundColor Green
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
