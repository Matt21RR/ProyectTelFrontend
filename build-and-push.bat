@echo off
REM Script para construir y empujar la imagen a Azure Container Registry (Windows)

setlocal enabledelayedexpansion

set REGISTRY_NAME=%1
if "%REGISTRY_NAME%"=="" set REGISTRY_NAME=proyectel

set IMAGE_NAME=proyectel-frontend
set IMAGE_TAG=%2
if "%IMAGE_TAG%"=="" set IMAGE_TAG=latest

set AZURE_RG=%3
if "%AZURE_RG%"=="" set AZURE_RG=proyectel-rg

echo.🐳 Construyendo imagen Docker...
docker build -t %IMAGE_NAME%:%IMAGE_TAG% .

echo.📦 Etiquetando imagen para ACR...
set ACR_LOGIN_SERVER=%REGISTRY_NAME%.azurecr.io
docker tag %IMAGE_NAME%:%IMAGE_TAG% %ACR_LOGIN_SERVER%/%IMAGE_NAME%:%IMAGE_TAG%

echo.🔐 Loguear a Azure Container Registry...
call az acr login --name %REGISTRY_NAME%

echo.📤 Empujando imagen a ACR...
docker push %ACR_LOGIN_SERVER%/%IMAGE_NAME%:%IMAGE_TAG%

echo.✅ ¡Build y push completados!
echo.
echo Para desplegar en Azure App Service, ejecuta:
echo az webapp config container set ^
echo   --resource-group %AZURE_RG% ^
echo   --name proyectel-frontend ^
echo   --docker-custom-image-name %ACR_LOGIN_SERVER%/%IMAGE_NAME%:%IMAGE_TAG% ^
echo   --docker-registry-server-url https://%ACR_LOGIN_SERVER% ^
echo   --docker-registry-server-user [usuario] ^
echo   --docker-registry-server-password [contraseña]

endlocal
