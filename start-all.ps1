# Start Both Backend and Frontend
Write-Host "======================================" -ForegroundColor Magenta
Write-Host "  PET STORE FULL STACK STARTUP" -ForegroundColor Magenta
Write-Host "======================================" -ForegroundColor Magenta

Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process PowerShell -ArgumentList "-NoExit -Command {cd '$PSScriptRoot\backend_clg'; npm run dev}" -WindowStyle Normal

Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Sleep 3
Start-Process PowerShell -ArgumentList "-NoExit -Command { npm start }" -WorkingDirectory "$PSScriptRoot\frontend" -WindowStyle Normal

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Both servers started in new windows!" -ForegroundColor Cyan
Write-Host "" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "" -ForegroundColor Cyan
Write-Host "Press Enter to close this window..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

Read-Host
