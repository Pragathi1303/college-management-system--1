# Start Backend Server
Write-Host "🚀 Starting Pet Store Backend..." -ForegroundColor Green
Write-Host "📁 Navigating to backend_clg folder..." -ForegroundColor Cyan

cd $PSScriptRoot\backend_clg

Write-Host "⏳ Starting server with npm run dev..." -ForegroundColor Yellow
npm run dev

Write-Host "✅ Backend started on http://localhost:5000" -ForegroundColor Green
