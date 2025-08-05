# API Endpoints - SudBank Frontend

## 🔗 Servicios Backend

### Regulatory Service (Puerto 8085)
```
Base URL: http://localhost:8085/api
```

#### NESL01 - Listado de Clientes
- `GET /nesl01` - Listar todos
- `GET /nesl01/{id}` - Buscar por ID
- `GET /nesl01/buscar?tipoIdentificacion={tipo}&identificacion={id}` - Buscar por identificación
- `POST /nesl01` - Crear registro
- `PUT /nesl01/{id}` - Actualizar registro
- `DELETE /nesl01/{id}` - Eliminar registro
- `POST /nesl01/export/txt` - Exportar TXT
- `POST /nesl01/export/excel` - Exportar Excel
- `POST /nesl01/validate` - Validar estructura

#### NESL05 - Depósitos
- `GET /nesl05` - Listar todos
- `GET /nesl05/{id}` - Buscar por ID
- `POST /nesl05` - Crear registro
- `PUT /nesl05/{id}` - Actualizar registro
- `DELETE /nesl05/{id}` - Eliminar registro

#### NESR01 - Emisores y Custodios
- `GET /nesr01` - Listar todos
- `GET /nesr01/{id}` - Buscar por ID
- `POST /nesr01` - Crear registro
- `PUT /nesr01/{id}` - Actualizar registro
- `DELETE /nesr01/{id}` - Eliminar registro

### SQL Server Adapter (Puerto 8080)
```
Base URL: http://localhost:8080/api
```

#### L08 - Liquidez Estructural
- `POST /l08/report` - Generar reporte L08
- `GET /l08/history` - Historial de reportes
- `POST /l08/export` - Exportar reporte
- `POST /l08/validate` - Validar datos

## 🔧 Configuración de URLs

### Desarrollo
```typescript
// En servicios
private regulatoryUrl = 'http://localhost:8085/api';
private adapterUrl = 'http://localhost:8080/api';
```

### Producción
```typescript
// Variables de entorno
private regulatoryUrl = process.env.API_BASE_URL + '/api';
private adapterUrl = process.env.ADAPTER_BASE_URL + '/api';
```

## 📊 Formato de Respuestas

### Respuesta Exitosa
```json
{
  "success": true,
  "data": [...],
  "total": 100,
  "message": "Operación exitosa"
}
```

### Respuesta de Error
```json
{
  "success": false,
  "error": "Descripción del error",
  "code": "ERROR_CODE"
}
```

## 🔐 Autenticación

Actualmente no requiere autenticación para desarrollo.

## 📝 Notas

- Todos los endpoints devuelven JSON
- CORS configurado para desarrollo local
- Timeout por defecto: 30 segundos
- Retry automático en caso de fallo de red 