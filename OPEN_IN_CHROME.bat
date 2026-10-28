@echo off
title AI Smart Crop Health Monitoring - Launcher
cd /d "%~dp0"

echo ===================================================
echo   AI-POWERED SMART CROP HEALTH MONITORING DASHBOARD
echo ===================================================
echo [1/2] Checking local server status...

netstat -ano | findstr /R /C:":5173 .*LISTENING" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Starting Smart Farm Server...
    start /min "Smart Farm Server" cmd /c "node server.cjs"
    ping 127.0.0.1 -n 2 >nul
) else (
    echo [INFO] Server is already active on port 5173.
)

echo [2/2] Opening dashboard in Google Chrome...
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:5173"
) else (
    start chrome "http://localhost:5173" || start "" "http://localhost:5173"
)

echo [DONE] Dashboard launched successfully.
ping 127.0.0.1 -n 2 >nul
exit
