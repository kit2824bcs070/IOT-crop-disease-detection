@echo off
title Push Project to GitHub
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"

echo =======================================================
echo    PUSH AI SMART CROP MONITORING TO GITHUB
echo =======================================================
echo.
set /p REPO_URL="Paste your GitHub repository URL (e.g. https://github.com/your-username/your-repo.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Exiting...
    pause
    exit /b
)

echo.
echo [1/3] Configuring remote origin...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [2/3] Setting branch to main...
git branch -M main

echo [3/3] Pushing code to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo [!] Push encountered an issue. Make sure your GitHub repository is created and you are logged in.
) else (
    echo.
    echo [SUCCESS] Project successfully pushed to GitHub!
)

echo.
pause
