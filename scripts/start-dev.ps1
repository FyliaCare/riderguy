#!/usr/bin/env pwsh
# RiderGuy Platform - Development Mode (Turbo)
# Uses Turbo for parallel execution with better logging

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     🚀 RIDERGUY PLATFORM - TURBO DEV MODE 🚀              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

Write-Host "Starting all services with Turbo..." -ForegroundColor Yellow
Write-Host "This will run all services in parallel with live logs.`n" -ForegroundColor Gray

# Set environment variables
$env:NODE_ENV = "development"

# Use Turbo to run all dev scripts in parallel
npx turbo run dev --parallel --no-cache

Write-Host "`n✅ All services stopped.`n" -ForegroundColor Green
