# RiderGuy Platform - Deployment Health Check
# Checks all deployed services and databases

param(
    [string]$Environment = "production"
)

Write-Host "=== RiderGuy Deployment Health Check ===" -ForegroundColor Cyan
Write-Host "Environment: $Environment" -ForegroundColor Yellow
Write-Host ""

# Service endpoints
$services = @(
    @{
        Name = "Rider PWA"
        URL = "https://riderguy-rider-pwa.onrender.com"
        HealthPath = "/api/health"
    },
    @{
        Name = "Auth Service"
        URL = "https://riderguy-auth-service.onrender.com"
        HealthPath = "/health"
    },
    @{
        Name = "Rider Profile Service"
        URL = "https://riderguy-rider-profile-service.onrender.com"
        HealthPath = "/health"
    },
    @{
        Name = "Dispatch Service"
        URL = "https://riderguy-dispatch-service.onrender.com"
        HealthPath = "/health"
    },
    @{
        Name = "Notification Service"
        URL = "https://riderguy-notification-service.onrender.com"
        HealthPath = "/health"
    },
    @{
        Name = "Wallet Service"
        URL = "https://riderguy-wallet-service.onrender.com"
        HealthPath = "/health"
    },
    @{
        Name = "Community Service"
        URL = "https://riderguy-community-service.onrender.com"
        HealthPath = "/health"
    },
    @{
        Name = "XP Level Service"
        URL = "https://riderguy-xp-level-service.onrender.com"
        HealthPath = "/health"
    },
    @{
        Name = "Analytics Service"
        URL = "https://riderguy-analytics-service.onrender.com"
        HealthPath = "/health"
    }
)

$healthyCount = 0
$unhealthyCount = 0
$totalCount = $services.Count

Write-Host "🏥 Checking service health..." -ForegroundColor Cyan
Write-Host ""

foreach ($service in $services) {
    $fullUrl = "$($service.URL)$($service.HealthPath)"
    
    try {
        $response = Invoke-WebRequest -Uri $fullUrl -TimeoutSec 10 -UseBasicParsing
        
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ $($service.Name)" -ForegroundColor Green
            $healthyCount++
            
            # Try to parse JSON response
            try {
                $data = $response.Content | ConvertFrom-Json
                if ($data.database) {
                    Write-Host "     Database: $($data.database)" -ForegroundColor Gray
                }
                if ($data.redis) {
                    Write-Host "     Redis: $($data.redis)" -ForegroundColor Gray
                }
            } catch {
                # Ignore JSON parse errors
            }
        } else {
            Write-Host "  ⚠️  $($service.Name) - Status: $($response.StatusCode)" -ForegroundColor Yellow
            $unhealthyCount++
        }
    } catch {
        Write-Host "  ❌ $($service.Name) - Error: $($_.Exception.Message)" -ForegroundColor Red
        $unhealthyCount++
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Summary
$healthPercentage = [math]::Round(($healthyCount / $totalCount) * 100, 1)

Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  Total Services: $totalCount" -ForegroundColor White
Write-Host "  Healthy: $healthyCount" -ForegroundColor Green
Write-Host "  Unhealthy: $unhealthyCount" -ForegroundColor $(if ($unhealthyCount -eq 0) { "Green" } else { "Red" })
Write-Host "  Health: $healthPercentage%" -ForegroundColor $(if ($healthPercentage -ge 90) { "Green" } elseif ($healthPercentage -ge 70) { "Yellow" } else { "Red" })
Write-Host ""

# Check Neon database (if DATABASE_URL provided)
if ($env:NEON_DATABASE_URL -or $env:DATABASE_URL) {
    Write-Host "🗄️  Database Status:" -ForegroundColor Cyan
    
    $dbUrl = if ($env:NEON_DATABASE_URL) { $env:NEON_DATABASE_URL } else { $env:DATABASE_URL }
    
    # Try to connect using psql if available
    $psqlAvailable = Get-Command psql -ErrorAction SilentlyContinue
    
    if ($psqlAvailable) {
        try {
            $null = & psql $dbUrl -c "SELECT version();" 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  ✅ Database connected" -ForegroundColor Green
            } else {
                Write-Host "  ❌ Database connection failed" -ForegroundColor Red
            }
        } catch {
            Write-Host "  ⚠️  Unable to check database (psql error)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ℹ️  Install psql to check database connection" -ForegroundColor Gray
    }
    Write-Host ""
}

# Overall status
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

if ($unhealthyCount -eq 0) {
    Write-Host "✨ All systems operational!" -ForegroundColor Green
} elseif ($healthPercentage -ge 80) {
    Write-Host "⚠️  Some services degraded" -ForegroundColor Yellow
} else {
    Write-Host "🚨 System experiencing major issues" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔍 View detailed logs:" -ForegroundColor Cyan
Write-Host "  https://dashboard.render.com/" -ForegroundColor White
Write-Host ""
Write-Host "📊 Neon dashboard:" -ForegroundColor Cyan
Write-Host "  https://console.neon.tech/" -ForegroundColor White
Write-Host ""

# Exit with appropriate code
if ($unhealthyCount -gt 0) {
    exit 1
} else {
    exit 0
}
