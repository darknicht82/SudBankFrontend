# ========================================
# DOCKERFILE - FRONTEND ANGULAR
# ========================================
# Propósito: Contenerizar aplicación Angular
# 
# Autor: Christian Aguirre
# Fecha: 2025-01-08

# Etapa de construcción
FROM node:18-alpine AS builder

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Construir aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar archivos construidos
COPY --from=builder /app/dist/risk-dashboard /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto
EXPOSE 4200

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"] 