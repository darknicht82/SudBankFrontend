# SudBank Frontend - Sistema Regulatorio

## 📋 Descripción

Frontend independiente para el Sistema Regulatorio de SudBank, desarrollado en Angular 18.

## 🏗️ Arquitectura

```
SudBankFrontend/
├── src/
│   ├── app/
│   │   ├── services/            # Servicios HTTP
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/               # Páginas principales
│   │   ├── models/              # Modelos de datos
│   │   ├── validators/          # Validadores
│   │   ├── catalogs/            # Catálogos regulatorios
│   │   └── utils/               # Utilidades
│   ├── assets/                  # Recursos estáticos
│   └── styles.css               # Estilos globales
├── docs/                        # Documentación
├── Dockerfile                   # Containerización
├── nginx.conf                   # Proxy reverso
└── docker-compose.yml           # Orquestación
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- npm 9+
- Angular CLI 18+

### Instalación
```bash
# Clonar repositorio
git clone <repository-url>
cd SudBankFrontend

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm start
```

### Desarrollo
```bash
# Servidor de desarrollo
ng serve --port 4200 --host 0.0.0.0

# Construcción para producción
ng build --configuration production

# Testing
ng test
```

## 📊 Módulos Regulatorios

### Estructuras L (Liquidez)
- **L07**: Emisores y Custodios 
- **L08**: Liquidez Estructural (Funcional Mock)
- **L09**: Detalles de Productos
- **L10**: Brechas de Sensibilidad
- **L11**: Sensibilidad del Valor Patrimonial
- **L12**: Captaciones por Monto
- **L13**: Obligaciones Financieras
- **L14**: Concentración de Depósitos
- **L31**: Brechas de Liquidez

## 🐳 Docker

### Construcción
```bash
docker build -t sudbank-frontend .
```

### Ejecución
```bash
docker run -p 4200:4200 sudbank-frontend
```

### Docker Compose
```bash
docker-compose up -d
```

## 📝 Scripts Disponibles

```json
{
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e"
}
```

## 🔗 Dependencias Principales

- **Angular**: 18.2.13
- **PrimeNG**: 18.0.2
- **Chart.js**: 4.5.0
- **Bootstrap**: 5.3.6
- **RxJS**: 7.8.2

## 👥 Autores

- **Christian Aguirre** - Desarrollo inicial

## 📄 Licencia

Proyecto interno de SudBank - Todos los derechos reservados

---

**Versión**: 1.0.0  
**Fecha**: 2025-01-08  
