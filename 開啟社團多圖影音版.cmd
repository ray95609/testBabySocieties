@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node.exe >nul 2>nul
if errorlevel 1 (
  echo 找不到 Node.js，請先安裝 Node.js 後再開啟。
  pause
  exit /b 1
)

powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Process -FilePath 'node.exe' -ArgumentList '""%~dp0社團多圖影音版伺服器.mjs""' -WindowStyle Hidden"
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:8765/"
