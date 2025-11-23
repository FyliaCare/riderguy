#!/usr/bin/env pwsh
# RiderGuy Platform - Check Status

$services = @(
    @{Name="Rider PWA"; Port=3001},
    @{Name="Dispatcher Dashboard"; Port=3101},
    @{Name="Admin Portal"; Port=3200},
    @{Name="Auth Service"; Port=4001},
    @{Name="Rider Profile"; Port=4002},
    @{Name="Task Service"; Port=4003},
    @{Name="Wallet Service"; Port=4004},
    @{Name="Notification Service"; Port=4005},
    @{Name="Training Service"; Port=4006},
    @{Name="Community Service"; Port=4007},
    @{Name="XP Level Service"; Port=4008},
    @{Name="Welfare Service"; Port=4009},
    @{Name="Dispatch (Go)"; Port=4010},
    @{Name="Telemetry (Go)"; Port=4011},
    @{Name="Analytics (Python)"; Port=4012}
)

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          RIDERGUY PLATFORM - SERVICE STATUS                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

$running = 0
$stopped = 0

foreach ($service in $services) {
    $listening = netstat -ano | findstr "LISTENING" | findstr ":$($service.Port) "
    if ($listening) {
        Write-Host ("  ✅ {0,-30} http://localhost:{1}" -f $service.Name, $service.Port) -ForegroundColor Green
        $running++
    } else {
        Write-Host ("  ❌ {0,-30} Port {1}" -f $service.Name, $service.Port) -ForegroundColor Red
        $stopped++
    }
}

$percentage = [math]::Round($running / $services.Count * 100)
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host ("║  Running: {0}/{1} ({2}%)                                     ║" -f $running, $services.Count, $percentage) -ForegroundColor $(if($running -eq $services.Count){'Green'}else{'Yellow'})
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Check database
Write-Host "💾 DATABASE STATUS:" -ForegroundColor Cyan
$postgres = docker ps --filter "name=postgres" --filter "status=running" --format "{{.Names}}" 2>$null
if ($postgres) {
    Write-Host "  ✅ PostgreSQL running" -ForegroundColor Green
} else {
    Write-Host "  ❌ PostgreSQL not running" -ForegroundColor Red
    Write-Host "     Run: docker-compose up -d postgres" -ForegroundColor Gray
}

Write-Host ""
