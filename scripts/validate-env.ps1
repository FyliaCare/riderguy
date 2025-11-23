# RiderGuy Environment Validation Script

param(
    [switch]$InstallMissing
)

Write-Host "`n=== RIDERGUY ENVIRONMENT VALIDATION ===`n" -ForegroundColor Cyan

$failed = $false
$projectRoot = Split-Path -Parent $PSScriptRoot

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion -match "v(\d+)") {
        $majorVersion = [int]$matches[1]
        if ($majorVersion -ge 20) {
            Write-Host "  [OK] Node.js $nodeVersion" -ForegroundColor Green
        } else {
            Write-Host "  [ERROR] Node.js $nodeVersion (Need v20+)" -ForegroundColor Red
            $failed = $true
        }
    }
} catch {
    Write-Host "  [ERROR] Node.js not found" -ForegroundColor Red
    $failed = $true
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    Write-Host "  [OK] npm v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  [ERROR] npm not found" -ForegroundColor Red
    $failed = $true
}

# Check Go (optional)
Write-Host "Checking Go..." -ForegroundColor Yellow
try {
    $goVersion = go version 2>$null
    Write-Host "  [OK] $goVersion" -ForegroundColor Green
} catch {
    Write-Host "  [WARN] Go not found (optional)" -ForegroundColor Yellow
}

# Check Python (optional)
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>$null
    Write-Host "  [OK] $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "  [WARN] Python not found (optional)" -ForegroundColor Yellow
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
        Write-Host "  [OK] $dir" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] $dir (missing)" -ForegroundColor Red
        $failed = $true
    }
}

# Check for node_modules
Write-Host "`nChecking dependencies..." -ForegroundColor Yellow
$nodeModules = Join-Path $projectRoot "node_modules"
if (Test-Path $nodeModules) {
    Write-Host "  [OK] Root node_modules exists" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Root node_modules missing" -ForegroundColor Red
    if ($InstallMissing) {
        Write-Host "  Installing dependencies..." -ForegroundColor Cyan
        Push-Location $projectRoot
        npm install
        Pop-Location
    } else {
        Write-Host "  TIP: Run 'npm install'" -ForegroundColor Yellow
        $failed = $true
    }
}

# Check environment variables
Write-Host "`nChecking environment variables..." -ForegroundColor Yellow
$envFile = Join-Path $projectRoot ".env"

if (Test-Path $envFile) {
    Write-Host "  [OK] .env file exists" -ForegroundColor Green
} else {
    Write-Host "  [WARN] .env file not found" -ForegroundColor Yellow
    Write-Host "  TIP: Copy .env.example to .env and configure" -ForegroundColor Yellow
}

# Summary
Write-Host ""
if ($failed) {
    Write-Host "[FAILED] VALIDATION FAILED" -ForegroundColor Red
    Write-Host "Fix the issues above before starting services.`n" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "[SUCCESS] ENVIRONMENT VALIDATED" -ForegroundColor Green
    Write-Host "All checks passed! You can start services.`n" -ForegroundColor Green
    exit 0
}
