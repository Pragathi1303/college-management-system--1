# Start Frontend Server
Write-Host "Starting frontend..." -ForegroundColor Green

cd $PSScriptRoot\frontend

Write-Host "Starting React app..." -ForegroundColor Yellow
npm start

Write-Host "Frontend started on http://localhost:3000" -ForegroundColor Green

