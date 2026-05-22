#!/bin/bash

# Script para construir y empujar la imagen a Azure Container Registry

set -e

REGISTRY_NAME="${1:-proyectel}"
IMAGE_NAME="proyectel-frontend"
IMAGE_TAG="${2:-latest}"
AZURE_RG="${3:-proyectel-rg}"

echo "🐳 Construyendo imagen Docker..."
docker build -t $IMAGE_NAME:$IMAGE_TAG .

echo "📦 Etiquetando imagen para ACR..."
ACR_LOGIN_SERVER="${REGISTRY_NAME}.azurecr.io"
docker tag $IMAGE_NAME:$IMAGE_TAG $ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG

echo "🔐 Loguear a Azure Container Registry..."
az acr login --name $REGISTRY_NAME

echo "📤 Empujando imagen a ACR..."
docker push $ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG

echo "✅ ¡Build y push completados!"
echo ""
echo "Para desplegar en Azure App Service, ejecuta:"
echo "az webapp config container set \\"
echo "  --resource-group $AZURE_RG \\"
echo "  --name proyectel-frontend \\"
echo "  --docker-custom-image-name $ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG \\"
echo "  --docker-registry-server-url https://$ACR_LOGIN_SERVER \\"
echo "  --docker-registry-server-user <usuario> \\"
echo "  --docker-registry-server-password <contraseña>"
