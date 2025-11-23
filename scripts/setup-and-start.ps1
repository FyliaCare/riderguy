# RiderGuy Platform - Complete Setup and Start Script
# This script validates environment, installs dependencies, and starts all services

param(
    [switch]$SkipValidation,
    [switch]$SkipInstall,
    [switch]$OnlyBackend,
    [switch]$OnlyFrontend
)

Write-Host "`n╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          RIDERGUY PLATFORM - SETUP & START                  ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

$projectRoot = Split-Path -Parent $PSScriptRoot
$ErrorActionPreference = "Continue"

# Step 1: Validate Environment
if (-not $SkipValidation) {
    Write-Host "⚡ STEP 1: Environment Validation" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor DarkGray
    
    $validationScript = Join-Path $PSScriptRoot "validate-environment.ps1"
    if (Test-Path $validationScript) {
        & $validationScript
        if ($LASTEXITCODE -ne 0) {
            Write-Host "`n❌ Environment validation failed. Fix issues and try again.`n" -ForegroundColor Red
            exit 1
        }
    }
}

# Step 2: Install Dependencies
if (-not $SkipInstall) {
    Write-Host "`n⚡ STEP 2: Installing Dependencies" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor DarkGray
    
    $nodeModules = Join-Path $projectRoot "node_modules"
    if (-not (Test-Path $nodeModules)) {
        Write-Host "📦 Installing root dependencies..." -ForegroundColor Cyan
        Push-Location $projectRoot
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "`n❌ Failed to install dependencies`n" -ForegroundColor Red
            Pop-Location
            exit 1
        }
        Pop-Location
    } else {
        Write-Host "✅ Dependencies already installed`n" -ForegroundColor Green
    }
}

# Step 3: Check .env file
Write-Host "⚡ STEP 3: Environment Configuration" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor DarkGray

$envFile = Join-Path $projectRoot ".env"
$envExample = Join-Path $projectRoot ".env.example"

if (-not (Test-Path $envFile)) {
    if (Test-Path $envExample) {
        Write-Host "⚠️  .env file not found. Creating from .env.example..." -ForegroundColor Yellow
        Copy-Item $envExample $envFile
        Write-Host "✅ .env file created. Please update with your credentials.`n" -ForegroundColor Green
    } else {
        Write-Host "❌ Neither .env nor .env.example found!`n" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ .env file exists`n" -ForegroundColor Green
}

# Step 4: Kill existing processes on required ports
Write-Host "⚡ STEP 4: Cleaning Up Ports" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor DarkGray

$ports = @(3000, 3001, 3002, 3003, 3300, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010, 4011, 4012, 5000)

foreach ($port in $ports) {
    $connections = netstat -ano | Select-String ":$port " | Select-String "LISTENING"
    if ($connections) {
        Write-Host "  🧹 Cleaning port $port..." -ForegroundColor Gray
        $connections | ForEach-Object {
            $line = $_.Line
            if ($line -match "\s+(\d+)\s*$") {
                $pid = $matches[1]
                try {
                    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                } catch {
                    # Ignore errors
                }
            }
        }
    }
}
Write-Host "✅ Ports cleaned`n" -ForegroundColor Green

# Step 5: Start Services
Write-Host "⚡ STEP 5: Starting Services" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor DarkGray

$backendServices = @(
    @{Name="Auth Service"; Dir="services\\auth-service"; Port=4001; Cmd="npm run dev"; Type="Node"},
    @{Name="Rider Profile"; Dir="services\\rider-profile-service"; Port=4002; Cmd="npm run dev"; Type="Node"},
    @{Name="Task Service"; Dir="services\\task-service"; Port=4003; Cmd="npm run dev"; Type="Node"},
    @{Name="Wallet Service"; Dir="services\\wallet-service"; Port=4004; Cmd="npm run dev"; Type="Node"},
    @{Name="Notification"; Dir="services\\notification-service"; Port=4005; Cmd="npm run dev"; Type="Node"},
    @{Name="Training"; Dir="services\\training-service"; Port=4006; Cmd="npm run dev"; Type="Node"},
    @{Name="Community"; Dir="services\\community-service"; Port=4007; Cmd="npm run dev"; Type="Node"},
    @{Name="XP Level"; Dir="services\\xp-level-service"; Port=4008; Cmd="npm run dev"; Type="Node"},
    @{Name="Welfare"; Dir="services\\welfare-service"; Port=4009; Cmd="npm run dev"; Type="Node"},
    @{Name="Dispatch (Go)"; Dir="services\\dispatch-service"; Port=4010; Cmd="go run main.go"; Type="Go"},
    @{Name="Telemetry (Go)"; Dir="services\\telemetry-service"; Port=4011; Cmd="go run main.go"; Type="Go"},
    @{Name="Analytics (Py)"; Dir="services\\analytics-service"; Port=4012; Cmd="python -m uvicorn main:app --host 0.0.0.0 --port 4012"; Type="Python"}
)

$frontendServices = @(
    @{Name="Rider PWA"; Dir="apps\\rider-pwa"; Port=3000; Cmd="npm run dev"; Type="Next"},
    @{Name="Public Website"; Dir="apps\\public-website"; Port=5000; Cmd="npm run dev -- --port 5000"; Type="Next"},
    @{Name="Dispatcher Dash"; Dir="apps\\dispatcher-dashboard"; Port=3002; Cmd="npm run dev"; Type="Vite"},
    @{Name="Admin Portal"; Dir="apps\\admin-portal"; Port=3003; Cmd="npm run dev"; Type="Vite"},
    @{Name="Business Dashboard"; Dir="apps\\business-dashboard"; Port=3300; Cmd="npm run dev"; Type="Vite"}
)

$servicesToStart = @()

if ($OnlyBackend) {
    $servicesToStart = $backendServices
} elseif ($OnlyFrontend) {
    $servicesToStart = $frontendServices
} else {
    $servicesToStart = $backendServices + $frontendServices
}

$startedCount = 0
$skippedCount = 0

foreach ($service in $servicesToStart) {
    $fullPath = Join-Path $projectRoot $service.Dir
    
    if (-not (Test-Path $fullPath)) {
        Write-Host "  ⚠️  SKIP: $($service.Name) - Directory not found" -ForegroundColor Yellow
        $skippedCount++
        continue
    }
    
    # Check if required runtime is available
    $canStart = $true
    switch ($service.Type) {
        "Go" {
            try {
                $null = go version 2>$null
            } catch {
                Write-Host "  ⚠️  SKIP: $($service.Name) - Go not installed" -ForegroundColor Yellow
                $skippedCount++
                $canStart = $false
            }
        }
        "Python" {
            try {
                $null = python --version 2>$null
            } catch {
                Write-Host "  ⚠️  SKIP: $($service.Name) - Python not installed" -ForegroundColor Yellow
                $skippedCount++
                $canStart = $false
            }
        }
    }
    
    if (-not $canStart) {
        continue
    }
    
    Write-Host "  🚀 Starting: $($service.Name) on port $($service.Port)..." -ForegroundColor Cyan
    
    Start-Job -Name $service.Name -ScriptBlock {
        param($path, $port, $cmd, $name)
        Set-Location $path
        $env:PORT = $port
        $env:NODE_ENV = "development"
        try {
            Invoke-Expression $cmd
        } catch {
            Write-Error "[$name] Failed: $_"
        }
    } -ArgumentList $fullPath, $service.Port, $service.Cmd, $service.Name | Out-Null
    
    $startedCount++
    Start-Sleep -Milliseconds 200
}

Write-Host "`n✅ Started $startedCount services" -ForegroundColor Green
if ($skippedCount -gt 0) {
    Write-Host "⚠️  Skipped $skippedCount services`n" -ForegroundColor Yellow
}

# Step 6: Wait and Verify
Write-Host "⏳ Waiting 15 seconds for services to initialize...`n" -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host "⚡ SERVICE STATUS CHECK" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor DarkGray

$runningCount = 0
$failedCount = 0

foreach ($service in $servicesToStart) {
    $listening = netstat -ano | Select-String "LISTENING" | Select-String ":$($service.Port) "
    if ($listening) {
        Write-Host "  ✅ $($service.Name) - http://localhost:$($service.Port)" -ForegroundColor Green
        $runningCount++
    } else {
        $fullPath = Join-Path $projectRoot $service.Dir
        if (Test-Path $fullPath) {
            Write-Host "  ❌ $($service.Name) - Port $($service.Port) (failed to start)" -ForegroundColor Red
            $failedCount++
        }
    }
}

# Summary
Write-Host "`n╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                     STATUS SUMMARY                          ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "Running:  $runningCount services" -ForegroundColor Green
Write-Host "Failed:   $failedCount services" -ForegroundColor $(if ($failedCount -gt 0) { "Red" } else { "Green" })
Write-Host "Skipped:  $skippedCount services" -ForegroundColor Yellow

Write-Host "`n📋 MANAGEMENT COMMANDS:" -ForegroundColor Cyan
Write-Host "  View jobs:     Get-Job" -ForegroundColor White
Write-Host "  View logs:     Get-Job -Name 'Service Name' | Receive-Job" -ForegroundColor White
Write-Host "  Stop all:      Get-Job | Stop-Job; Get-Job | Remove-Job" -ForegroundColor White
Write-Host "  Or run:        .\\scripts\\stop-all.ps1`n" -ForegroundColor White

if ($failedCount -gt 0) {
    Write-Host "⚠️  Some services failed to start. Check logs with:" -ForegroundColor Yellow
    Write-Host "   Get-Job | Where-Object { `$_.State -eq 'Failed' } | Receive-Job`n" -ForegroundColor Yellow
}

Write-Host "🎉 Setup complete! Services are running in background jobs.`n" -ForegroundColor Green
