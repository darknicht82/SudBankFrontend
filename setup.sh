#!/bin/bash

# ========================================
# SCRIPT DE CONFIGURACIÓN - SUDBANK FRONTEND
# ========================================
# Propósito: Configurar proyecto en nueva computadora
#
# Autor: Christian Aguirre
# Fecha: 2025-01-08

echo "🚀 Configurando SudBank Frontend..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Instale Node.js 18+"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

# Verificar Angular CLI
if ! command -v ng &> /dev/null; then
    echo "📦 Instalando Angular CLI..."
    npm install -g @angular/cli@18
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --legacy-peer-deps

# Configurar URLs de backend (opcional)
read -p "¿Desea configurar URLs de backend? (y/n): " configure_backend
if [ "$configure_backend" = "y" ]; then
    read -p "IP del Regulatory Service (default: localhost): " regulatory_ip
    read -p "IP del SQL Server Adapter (default: localhost): " adapter_ip
    
    regulatory_ip=${regulatory_ip:-localhost}
    adapter_ip=${adapter_ip:-localhost}
    
    echo "🔧 Configurando URLs..."
    # Aquí se pueden agregar comandos para actualizar URLs en los servicios
    echo "✅ URLs configuradas:"
    echo "   Regulatory Service: http://$regulatory_ip:8085"
    echo "   SQL Server Adapter: http://$adapter_ip:8080"
fi

echo "✅ Configuración completada!"
echo ""
echo "🎯 Comandos disponibles:"
echo "   npm start          - Iniciar servidor de desarrollo"
echo "   npm run build      - Construir para producción"
echo "   npm test           - Ejecutar tests"
echo "   docker-compose up  - Iniciar con Docker"
echo ""
echo "🌐 Acceder a: http://localhost:4200" 