#!/usr/bin/env pwsh
# RiderGuy Platform - Stop All Services

Write-Host "`n🛑 Stopping all RiderGuy services..." -ForegroundColor Yellow

# Stop all background jobs
$jobs = Get-Job
if ($jobs) {
    Write-Host "  Stopping $($jobs.Count) background jobs..." -ForegroundColor Gray
    Get-Job | Stop-Job
    Get-Job | Remove-Job
    Write-Host "  ✅ All jobs stopped" -ForegroundColor Green
} else {
    Write-Host "  ℹ️  No background jobs found" -ForegroundColor Gray
}

# Kill processes on known ports
$ports = @(3000, 3001, 3002, 3003, 3100, 3101, 3200, 3201, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010, 4011, 4012)

Write-Host "`n  Checking for processes on service ports..." -ForegroundColor Gray

$killed = 0
foreach ($port in $ports) {
    $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    foreach ($conn in $conns) {
        try {
            $proc = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
            if ($proc) {
                Write-Host "  🔴 Stopping process on port $port (PID: $($proc.Id))..." -ForegroundColor Yellow
                Stop-Process -Id $proc.Id -Force
                $killed++
            }
        } catch {
            # Process already stopped or access denied
        }
    }
}

if ($killed -gt 0) {
    Write-Host "  ✅ Stopped $killed processes" -ForegroundColor Green
} else {
    Write-Host "  ℹ️  No processes found on service ports" -ForegroundColor Gray
}

Write-Host "`n✅ All RiderGuy services stopped!`n" -ForegroundColor Green
