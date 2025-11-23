# RiderGuy Platform - Neon Database Setup Script

param(
    [string]$NeonApiKey = $env:NEON_API_KEY,
    [string]$ProjectName = "riderguy-production"
)

Write-Host "=== Neon Database Setup ===" -ForegroundColor Cyan
Write-Host ""

if (-not $NeonApiKey) {
    Write-Host "⚠️  No Neon API key found. Manual setup required." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Follow these steps:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Go to https://console.neon.tech/" -ForegroundColor White
    Write-Host "2. Click 'New Project'" -ForegroundColor White
    Write-Host "3. Configure:" -ForegroundColor White
    Write-Host "   - Name: $ProjectName" -ForegroundColor Gray
    Write-Host "   - Region: Choose closest to your users" -ForegroundColor Gray
    Write-Host "   - PostgreSQL: 15+" -ForegroundColor Gray
    Write-Host "4. Copy the connection string" -ForegroundColor White
    Write-Host "5. Add to Render environment variables as DATABASE_URL" -ForegroundColor White
    Write-Host ""
    Write-Host "Connection string format:" -ForegroundColor Yellow
    Write-Host "  postgresql://user:pass@ep-xxxxx.us-east-2.aws.neon.tech/riderguy?sslmode=require" -ForegroundColor Gray
    Write-Host ""
    exit 0
}

# If API key provided, automate setup
Write-Host "🔑 Using Neon API key" -ForegroundColor Green
Write-Host ""

Write-Host "📝 Creating project: $ProjectName..." -ForegroundColor Cyan

$createProjectBody = @{
    project = @{
        name = $ProjectName
        pg_version = 15
    }
} | ConvertTo-Json

try {
    $project = Invoke-RestMethod -Uri "https://console.neon.tech/api/v2/projects" `
        -Method Post `
        -Headers @{
            "Authorization" = "Bearer $NeonApiKey"
            "Content-Type" = "application/json"
        } `
        -Body $createProjectBody
    
    Write-Host "✅ Project created: $($project.project.id)" -ForegroundColor Green
    Write-Host ""
    
    # Get connection string
    $connectionString = $project.connection_uris[0].connection_uri
    
    Write-Host "📋 Connection String:" -ForegroundColor Cyan
    Write-Host $connectionString -ForegroundColor White
    Write-Host ""
    
    Write-Host "🔐 Save this connection string!" -ForegroundColor Yellow
    Write-Host "Add it to your Render services as DATABASE_URL" -ForegroundColor Yellow
    Write-Host ""
    
    # Create additional database for telemetry
    Write-Host "📊 Creating telemetry database..." -ForegroundColor Cyan
    
    $createDbBody = @{
        database = @{
            name = "riderguy_telemetry"
            owner_name = $project.project.default_branch_database.owner_name
        }
    } | ConvertTo-Json
    
    Invoke-RestMethod -Uri "https://console.neon.tech/api/v2/projects/$($project.project.id)/databases" `
        -Method Post `
        -Headers @{
            "Authorization" = "Bearer $NeonApiKey"
            "Content-Type" = "application/json"
        } `
        -Body $createDbBody
    
    Write-Host "✅ Telemetry database created" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create project manually at https://console.neon.tech/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✨ Neon setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Add DATABASE_URL to Render environment variables" -ForegroundColor White
Write-Host "2. Run migrations: npm run migrate" -ForegroundColor White
Write-Host "3. Deploy services: .\scripts\deploy.ps1" -ForegroundColor White
