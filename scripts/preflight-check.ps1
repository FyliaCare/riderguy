# RiderGuy - Render Deployment Pre-Flight Check

Write-Host "╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   RiderGuy Deployment Pre-Flight Check               ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()
$checks = 0
$passed = 0

function Test-Check {
    param(
        [string]$Name,
        [scriptblock]$Test,
        [string]$ErrorMessage,
        [string]$SuccessMessage,
        [bool]$Required = $true
    )
    
    $script:checks++
    Write-Host "  Testing: $Name..." -NoNewline
    
    try {
        $result = & $Test
        if ($result) {
            Write-Host " ✅" -ForegroundColor Green
            $script:passed++
            if ($SuccessMessage) {
                Write-Host "    $SuccessMessage" -ForegroundColor Gray
            }
            return $true
        } else {
            if ($Required) {
                Write-Host " ❌" -ForegroundColor Red
                $script:errors += "$Name - $ErrorMessage"
            } else {
                Write-Host " ⚠️" -ForegroundColor Yellow
                $script:warnings += "$Name - $ErrorMessage"
            }
            return $false
        }
    } catch {
        if ($Required) {
            Write-Host " ❌" -ForegroundColor Red
            $script:errors += "$Name - $($_.Exception.Message)"
        } else {
            Write-Host " ⚠️" -ForegroundColor Yellow
            $script:warnings += "$Name - $($_.Exception.Message)"
        }
        return $false
    }
}

Write-Host "🔍 System Requirements" -ForegroundColor Yellow
Write-Host ""

Test-Check "Node.js 20+" {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion -match "v(\d+)\.") {
        return [int]$matches[1] -ge 20
    }
    return $false
} "Node.js 20+ required" "Node.js: $nodeVersion"

Test-Check "npm 10+" {
    $npmVersion = npm --version 2>$null
    if ($npmVersion -match "(\d+)\.") {
        return [int]$matches[1] -ge 10
    }
    return $false
} "npm 10+ required" "npm: $npmVersion"

Test-Check "Git installed" {
    Get-Command git -ErrorAction SilentlyContinue
} "Git is required for deployment"

Write-Host ""
Write-Host "📦 Project Structure" -ForegroundColor Yellow
Write-Host ""

Test-Check "package.json exists" {
    Test-Path "package.json"
} "Root package.json not found"

Test-Check "render.yaml exists" {
    Test-Path "render.yaml"
} "render.yaml not found"

Test-Check "Rider PWA app" {
    (Test-Path "apps/rider-pwa") -and (Test-Path "apps/rider-pwa/package.json")
} "Rider PWA not found or incomplete"

Test-Check "Public Website app" {
    (Test-Path "apps/public-website") -and (Test-Path "apps/public-website/package.json")
} "Public Website not found or incomplete"

Test-Check "Admin Portal app" {
    (Test-Path "apps/admin-portal") -and (Test-Path "apps/admin-portal/package.json")
} "Admin Portal not found or incomplete"

Test-Check "Dispatcher Dashboard app" {
    (Test-Path "apps/dispatcher-dashboard") -and (Test-Path "apps/dispatcher-dashboard/package.json")
} "Dispatcher Dashboard not found or incomplete"

Test-Check "Business Dashboard app" {
    (Test-Path "apps/business-dashboard") -and (Test-Path "apps/business-dashboard/package.json")
} "Business Dashboard not found or incomplete"

Write-Host ""
Write-Host "🔧 Services Check" -ForegroundColor Yellow
Write-Host ""

$services = @(
    "auth-service",
    "rider-profile-service",
    "notification-service",
    "wallet-service",
    "community-service",
    "xp-level-service",
    "dispatch-service",
    "analytics-service"
)

foreach ($service in $services) {
    Test-Check "$service exists" {
        Test-Path "services/$service"
    } "$service not found" -Required $false
}

Write-Host ""
Write-Host "🐳 Docker Configuration" -ForegroundColor Yellow
Write-Host ""

Test-Check "Dockerfile.rider-pwa" {
    Test-Path "Dockerfile.rider-pwa"
} "Rider PWA Dockerfile not found"

Test-Check "Dockerfile.auth-service" {
    Test-Path "Dockerfile.auth-service"
} "Auth Service Dockerfile not found"

Test-Check "Dockerfile.dispatch-service" {
    Test-Path "Dockerfile.dispatch-service"
} "Dispatch Service Dockerfile not found"

Test-Check "Dockerfile.analytics-service" {
    Test-Path "Dockerfile.analytics-service"
} "Analytics Service Dockerfile not found"

Test-Check ".dockerignore" {
    Test-Path ".dockerignore"
} ".dockerignore not found"

Write-Host ""
Write-Host "📄 Configuration Files" -ForegroundColor Yellow
Write-Host ""

Test-Check ".env.example" {
    Test-Path ".env.example"
} ".env.example not found"

Test-Check "Health check endpoints" {
    (Test-Path "apps/rider-pwa/src/app/api/health/route.ts") -and 
    (Test-Path "apps/public-website/app/api/health/route.ts")
} "Health check endpoints missing"

Test-Check "README.md updated" {
    $readme = Get-Content "README.md" -Raw
    $readme -match "Deployment" -and $readme -match "Render"
} "README missing deployment info" -Required $false

Write-Host ""
Write-Host "🔐 Environment Variables Template" -ForegroundColor Yellow
Write-Host ""

$envExample = Get-Content ".env.example" -Raw
$requiredVars = @(
    "DATABASE_URL",
    "REDIS_URL",
    "JWT_SECRET",
    "NODE_ENV"
)

foreach ($var in $requiredVars) {
    Test-Check "ENV: $var" {
        $envExample -match $var
    } "$var missing from .env.example" -Required $false
}

Write-Host ""
Write-Host "📜 Scripts" -ForegroundColor Yellow
Write-Host ""

Test-Check "deploy.ps1" {
    Test-Path "scripts/deploy.ps1"
} "Deploy script not found"

Test-Check "setup-neon.ps1" {
    Test-Path "scripts/setup-neon.ps1"
} "Neon setup script not found"

Test-Check "health-check.ps1" {
    Test-Path "scripts/health-check.ps1"
} "Health check script not found"

Write-Host ""
Write-Host "📚 Documentation" -ForegroundColor Yellow
Write-Host ""

Test-Check "Deployment Guide" {
    Test-Path "docs/guides/deployment-guide.md"
} "Deployment guide not found"

Test-Check "Deployment Checklist" {
    Test-Path "docs/guides/deployment-checklist.md"
} "Deployment checklist not found"

Test-Check "Project Structure Doc" {
    Test-Path "PROJECT_STRUCTURE.md"
} "Project structure doc not found"

Write-Host ""
Write-Host "🔍 Git Status" -ForegroundColor Yellow
Write-Host ""

Test-Check "Git repository" {
    Test-Path ".git"
} "Not a git repository"

Test-Check "No uncommitted changes" {
    $status = git status --porcelain 2>$null
    -not $status
} "You have uncommitted changes" -Required $false

Write-Host ""
Write-Host "══════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

# Summary
$percentage = [math]::Round(($passed / $checks) * 100, 1)

Write-Host "📊 SUMMARY" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Total Checks: $checks" -ForegroundColor White
Write-Host "  Passed: $passed" -ForegroundColor Green
Write-Host "  Failed: $($errors.Count)" -ForegroundColor Red
Write-Host "  Warnings: $($warnings.Count)" -ForegroundColor Yellow
Write-Host "  Success Rate: $percentage%" -ForegroundColor $(if ($percentage -ge 90) { "Green" } elseif ($percentage -ge 70) { "Yellow" } else { "Red" })
Write-Host ""

if ($errors.Count -gt 0) {
    Write-Host "❌ ERRORS (Must Fix):" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  • $error" -ForegroundColor Red
    }
    Write-Host ""
}

if ($warnings.Count -gt 0) {
    Write-Host "⚠️  WARNINGS (Recommended):" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  • $warning" -ForegroundColor Yellow
    }
    Write-Host ""
}

if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "✅ ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Ready to deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Commit changes: git commit -am 'Ready for deployment'" -ForegroundColor White
    Write-Host "  2. Push to GitHub: git push origin main" -ForegroundColor White
    Write-Host "  3. Create Neon database: .\scripts\setup-neon.ps1" -ForegroundColor White
    Write-Host "  4. Deploy to Render: Dashboard - New - Blueprint" -ForegroundColor White
    Write-Host ""
} elseif ($errors.Count -eq 0) {
    Write-Host "Ready with warnings" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You can proceed, but consider fixing warnings." -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "NOT READY FOR DEPLOYMENT" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please fix the errors above before deploying." -ForegroundColor Red
    Write-Host ""
    exit 1
}
