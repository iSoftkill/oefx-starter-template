# Script para ejecutar el proyecto con Node v22.23.2 sin modificar la versión global
$env:PATH = "C:\Users\jalvareza\AppData\Roaming\nvm\v22.23.2;$env:PATH"
Write-Host "Iniciando con Node $(node -v)..." -ForegroundColor Cyan
npm start
