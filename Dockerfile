# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Stage 2: Runtime (Nginx)
FROM nginx:alpine

# Instalar envsubst para variable substitution
RUN apk add --no-cache gettext

# Copiar archivo de configuración nginx personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar script de entrypoint
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copiar archivos construidos del stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/index.html || exit 1

# Comando de inicio
ENTRYPOINT ["/docker-entrypoint.sh"]
