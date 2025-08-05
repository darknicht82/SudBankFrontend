# Arquitectura Modular de Reportes Regulatorios

## Estructura de Carpetas

```
src/app/regulatory/
├── l08/                    # Reporte L08 - Liquidez
│   ├── models/            # Modelos de datos L08
│   ├── services/          # Servicios L08
│   └── components/        # Componentes L08
├── l10/                    # Reporte L10 - Brechas de Sensibilidad
│   ├── models/            # Modelos de datos L10
│   ├── services/          # Servicios L10
│   └── components/        # Componentes L10
├── l14/                    # Reporte L14 - Concentración de Depósitos
│   ├── models/            # Modelos de datos L14
│   ├── services/          # Servicios L14
│   └── components/        # Componentes L14
├── shared/                 # Servicios compartidos
│   └── regulatory-orchestrator.service.ts
└── index.ts               # Exportaciones centralizadas
```

## Principios de Diseño

### 1. Separación por Estructura Regulatoria
- Cada estructura regulatoria (L08, L10, L14) tiene su propia carpeta
- Modelos, servicios y componentes específicos por estructura
- Evita mezcla de datos entre diferentes reportes

### 2. Modelos Tipados
- Interfaces TypeScript específicas para cada estructura
- Validación de tipos en tiempo de compilación
- Cumplimiento estricto con especificaciones SB

### 3. Servicios Especializados
- Un servicio por estructura regulatoria
- Métodos específicos para cada tipo de reporte
- Manejo de errores y datos simulados como fallback

### 4. Componentes Modulares
- Componentes específicos por estructura
- Reutilización de lógica común
- Fácil mantenimiento y testing

## Uso de la Arquitectura

### Importar Servicios
```typescript
// Importación específica
import { L08Service } from './regulatory/l08/services/l08.service';
import { L10Service } from './regulatory/l10/services/l10.service';
import { L14Service } from './regulatory/l14/services/l14.service';

// O importación centralizada
import { L08Service, L10Service, L14Service } from './regulatory';
```

### Usar Modelos
```typescript
import { L08Data, L08ReportRequest } from './regulatory/l08/models/l08.model';

const request: L08ReportRequest = {
  fechaInicio: '2025-06-23',
  fechaFin: '2025-06-28'
};
```

### Crear Componentes
```typescript
import { Component } from '@angular/core';
import { L08Service } from '../services/l08.service';
import { L08Data } from '../models/l08.model';

@Component({
  selector: 'app-l08-dashboard',
  template: '...'
})
export class L08DashboardComponent {
  constructor(private l08Service: L08Service) {}
}
```

## Servicio Orquestador

El `RegulatoryOrchestratorService` proporciona:
- Resumen general de todos los reportes
- Verificación de conectividad
- Generación masiva de reportes
- Validación global de datos

## Ventajas de esta Arquitectura

1. **Cumplimiento Normativo**: Separación estricta evita mezcla de datos
2. **Mantenibilidad**: Cambios en una estructura no afectan otras
3. **Escalabilidad**: Fácil agregar nuevas estructuras regulatorias
4. **Testing**: Componentes y servicios aislados para testing unitario
5. **Reutilización**: Lógica común en servicios compartidos

## Migración de Código Existente

### Antes (Servicio General)
```typescript
// ❌ Mezcla de estructuras
export class RegulatoryService {
  getL08Data() { ... }
  getL10Data() { ... }
  getL14Data() { ... }
}
```

### Después (Servicios Especializados)
```typescript
// ✅ Separación por estructura
export class L08Service {
  getL08Data() { ... }
}

export class L10Service {
  getL10Data() { ... }
}

export class L14Service {
  getL14Data() { ... }
}
```

## Próximos Pasos

1. Migrar componentes existentes a la nueva estructura
2. Actualizar imports en toda la aplicación
3. Eliminar el servicio general `regulatory.service.ts`
4. Implementar validadores específicos por estructura
5. Crear componentes de dashboard para L10 y L14 
