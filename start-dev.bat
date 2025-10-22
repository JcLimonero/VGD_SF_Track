@echo off
echo Iniciando servidor mock y aplicación Angular...
echo.

echo 1. Iniciando servidor mock en puerto 3000...
start "API Mock Server" cmd /k "cd api-mock && npm start"

echo.
echo 2. Esperando 3 segundos para que el servidor mock se inicie...
timeout /t 3 /nobreak > nul

echo.
echo 3. Iniciando aplicación Angular en puerto 4200...
start "Angular App" cmd /k "ng serve"

echo.
echo Ambos servidores están iniciando...
echo - Servidor Mock: http://localhost:3000
echo - Aplicación Angular: http://localhost:4200
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul

