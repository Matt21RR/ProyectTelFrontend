#!/bin/sh

# Reemplazar variables de entorno en nginx.conf dinámicamente
envsubst '${AUTH_HOST},${AUTH_PORT},${LIBRARY_HOST},${LIBRARY_PORT},${INTERACTION_HOST},${INTERACTION_PORT}' \
  < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf.tmp && \
  mv /etc/nginx/nginx.conf.tmp /etc/nginx/nginx.conf

# Ejecutar nginx
exec nginx -g "daemon off;"
