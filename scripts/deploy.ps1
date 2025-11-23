# RiderGuy Platform - Quick Deploy Script
# Deploys to Render using their API

param(
    [string]$RenderApiKey = $env:RENDER_API_KEY,
    [switch]$Production
)

Write-Host "=== RiderGuy Deployment Script ===" -ForegroundColor Cyan
Write-Host ""

if (-not $RenderApiKey) {
    Write-Host "❌ Error: RENDER_API_KEY not found" -ForegroundColor Red
    Write-Host "Get your API key from: https://dashboard.render.com/u/settings#api-keys" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then run:" -ForegroundColor Yellow
    Write-Host '  $env:RENDER_API_KEY="your-api-key"' -ForegroundColor White
    Write-Host "  .\scripts\deploy.ps1" -ForegroundColor White
    exit 1
}

# Check if git repo is clean
$gitStatus = git status --porcelain
if ($gitStatus -and $Production) {
    Write-Host "⚠️  Warning: You have uncommitted changes" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -ne "y") {
        exit 0
    }
}

# Get current branch
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "📍 Current branch: $branch" -ForegroundColor Green

# Push to GitHub
Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
git push origin $branch

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Pushed to GitHub" -ForegroundColor Green

# Trigger Render deploy
Write-Host ""
Write-Host "🚀 Triggering Render deployment..." -ForegroundColor Cyan

# You'll need to get your service IDs from Render dashboard
$services = @(
    @{Name="Rider PWA"; Id=$env:RENDER_SERVICE_ID_RIDER_PWA},
    @{Name="Auth Service"; Id=$env:RENDER_SERVICE_ID_AUTH},
    @{Name="Dispatch Service"; Id=$env:RENDER_SERVICE_ID_DISPATCH}
)

foreach ($service in $services) {
    if ($service.Id) {
        Write-Host "  Deploying $($service.Name)..." -ForegroundColor Yellow
        
        $response = Invoke-RestMethod -Uri "https://api.render.com/v1/services/$($service.Id)/deploys" `
            -Method Post `
            -Headers @{
                "Authorization" = "Bearer $RenderApiKey"
                "Content-Type" = "application/json"
            } `
            -Body (@{
                clearCache = $Production
            } | ConvertTo-Json)
        
        Write-Host "  ✅ $($service.Name) deployment started" -ForegroundColor Green
    } else {
        Write-Host "  ⏭️  Skipping $($service.Name) (no service ID)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "✨ Deployment initiated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 Check deployment status:" -ForegroundColor Cyan
Write-Host "  https://dashboard.render.com/" -ForegroundColor White
Write-Host ""
Write-Host "📊 View logs:" -ForegroundColor Cyan
Write-Host "  render logs <service-name>" -ForegroundColor White
