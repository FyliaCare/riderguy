# RiderGuy Platform - Start All Services

Write-Host "`nRIDERGUY PLATFORM - STARTING ALL SERVICES`n" -ForegroundColor Cyan

# Get project root (parent of scripts directory)
$projectRoot = Split-Path -Parent $PSScriptRoot

$services = @(
    @{Name="Auth Service"; Dir="services\\auth-service"; Port=4001; Cmd="npm run dev"},
    @{Name="Rider Profile"; Dir="services\\rider-profile-service"; Port=4002; Cmd="npm run dev"},
    @{Name="Task Service"; Dir="services\\task-service"; Port=4003; Cmd="npm run dev"},
    @{Name="Wallet Service"; Dir="services\\wallet-service"; Port=4004; Cmd="npm run dev"},
    @{Name="Notification"; Dir="services\\notification-service"; Port=4005; Cmd="npm run dev"},
    @{Name="Training"; Dir="services\\training-service"; Port=4006; Cmd="npm run dev"},
    @{Name="Community"; Dir="services\\community-service"; Port=4007; Cmd="npm run dev"},
    @{Name="XP Level"; Dir="services\\xp-level-service"; Port=4008; Cmd="npm run dev"},
    @{Name="Welfare"; Dir="services\\welfare-service"; Port=4009; Cmd="npm run dev"},
    @{Name="Dispatch (Go)"; Dir="services\\dispatch-service"; Port=4010; Cmd="go run main.go"},
    @{Name="Telemetry (Go)"; Dir="services\\telemetry-service"; Port=4011; Cmd="go run main.go"},
    @{Name="Analytics (Py)"; Dir="services\\analytics-service"; Port=4012; Cmd="python -m uvicorn main:app --host 0.0.0.0 --port 4012"},
    @{Name="Rider PWA"; Dir="apps\\rider-pwa"; Port=3000; Cmd="npm run dev"},
    @{Name="Dispatcher Dash"; Dir="apps\\dispatcher-dashboard"; Port=3002; Cmd="npm run dev"},
    @{Name="Admin Portal"; Dir="apps\\admin-portal"; Port=3003; Cmd="npm run dev"},
    @{Name="Business Dashboard"; Dir="apps\\business-dashboard"; Port=3300; Cmd="npm run dev"},
    @{Name="Public Website"; Dir="apps\\public-website"; Port=5000; Cmd="npm run dev -- --port 5000"}
)

Write-Host "Starting services in background jobs..." -ForegroundColor Yellow

foreach ($service in $services) {
    $fullPath = Join-Path $projectRoot $service.Dir
    
    if (-not (Test-Path $fullPath)) {
        Write-Host "  [SKIP] $($service.Name) - Directory not found: $fullPath" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "  > Starting $($service.Name) on port $($service.Port)..." -ForegroundColor Gray
    
    Start-Job -ScriptBlock {
        param($path, $port, $cmd)
        Set-Location $path
        $env:PORT = $port
        $env:NODE_ENV = "development"
        try {
            Invoke-Expression $cmd 2>&1 | Out-Null
        } catch {
            Write-Error "Failed to start service: $_"
        }
    } -ArgumentList $fullPath, $service.Port, $service.Cmd | Out-Null
    
    Start-Sleep -Milliseconds 300
}

Write-Host "`nAll services started!" -ForegroundColor Green
Write-Host "Waiting 10 seconds for initialization...`n" -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "SERVICE STATUS`n" -ForegroundColor Cyan

$running = 0
foreach ($service in $services) {
    $listening = netstat -ano | findstr "LISTENING" | findstr ":$($service.Port) "
    if ($listening) {
        Write-Host "  [OK] $($service.Name) - http://localhost:$($service.Port)" -ForegroundColor Green
        $running++
    } else {
        Write-Host "  [X] $($service.Name) - Port $($service.Port)" -ForegroundColor Red
    }
}

Write-Host "`nRunning: $running/$($services.Count) services" -ForegroundColor Yellow
Write-Host "`nCommands: Get-Job | .\stop-all.ps1`n" -ForegroundColor Cyan
