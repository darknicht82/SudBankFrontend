# 🎨 SUDBANK CSS STANDARDS - ESTÁNDARES CSS

## 📋 **RESUMEN EJECUTIVO**

Este documento define los estándares CSS para el proyecto SudBank Frontend, estableciendo reglas claras para el uso de estilos centralizados y locales.

## 🏗️ **ARQUITECTURA CSS**

### **ESTRUCTURA DE ARCHIVOS:**
```
src/styles/
├── _sudbank-main.scss          # ✅ ESTILOS PRINCIPALES CENTRALIZADOS
├── _bootstrap-replacement.scss # ✅ REPLACEMENT DE BOOTSTRAP
├── components/                 # ✅ COMPONENTES ESPECÍFICOS
├── utilities/                  # ✅ UTILIDADES GLOBALES
├── themes/                     # ✅ TEMAS Y VARIANTES
└── vendor/                     # ✅ LIBRERÍAS EXTERNAS
```

## 🎯 **REGLAS FUNDAMENTALES**

### **1. ESTILOS CENTRALIZADOS (OBLIGATORIOS):**
- ✅ **Modales**: Header, body, footer, botones, superposición
- ✅ **Headers**: Gradientes, colores, tipografía, espaciado
- ✅ **Botones**: Estados, colores, hover effects, transiciones
- ✅ **Cards**: Bordes, sombras, espaciado interno
- ✅ **Formularios**: Inputs, selects, labels, validaciones
- ✅ **Indicadores**: Badges, estados, colores
- ✅ **Layout**: Containers, grids, espaciado
- ✅ **Tipografía**: Títulos, subtítulos, textos

### **2. ESTILOS LOCALES (PERMITIDOS):**
- ✅ **Nombres de clases específicos**: `.l01-main-container`, `.l02-dashboard`
- ✅ **Contenido único**: Textos específicos, iconos particulares
- ✅ **Posicionamiento único**: Layouts muy específicos del componente

### **3. ESTILOS PROHIBIDOS:**
- ❌ **Duplicar estilos centralizados**
- ❌ **Definir colores globales**
- ❌ **Crear botones personalizados**
- ❌ **Implementar modales desde cero**

## 🎨 **CLASES CSS DISPONIBLES**

### **MODALES ESTÁNDAR:**
```html
<div class="modal-overlay">
  <div class="modal-content">
    <div class="modal-header">
      <h3><i class="fas fa-user"></i> Título del Modal</h3>
      <button class="close-button"><i class="fas fa-times"></i></button>
    </div>
    <div class="modal-body">
      <p>Contenido del modal...</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary">Cancelar</button>
      <button class="btn btn-primary">Confirmar</button>
    </div>
  </div>
</div>
```

### **HEADERS ESTÁNDAR:**
```html
<div class="header">
  <h1>Título Principal</h1>
  <p class="subtitle">Subtítulo descriptivo</p>
</div>
```

### **BOTONES ESTÁNDAR:**
```html
<!-- Botones principales -->
<button class="btn btn-primary">Botón Principal</button>
<button class="btn btn-secondary">Botón Secundario</button>
<button class="btn btn-success">Botón Éxito</button>
<button class="btn btn-danger">Botón Peligro</button>

<!-- Botones outline -->
<button class="btn btn-outline-primary">Outline Principal</button>
<button class="btn btn-outline-secondary">Outline Secundario</button>

<!-- Tamaños -->
<button class="btn btn-primary btn-sm">Botón Pequeño</button>
<button class="btn btn-primary btn-lg">Botón Grande</button>
```

### **CARDS ESTÁNDAR:**
```html
<div class="card">
  <div class="card-header">
    <h3>Título de la Card</h3>
    <p>Descripción de la card</p>
  </div>
  <div class="card-content">
    <p>Contenido de la card...</p>
  </div>
</div>
```

### **FORMULARIOS ESTÁNDAR:**
```html
<div class="form-field">
  <label>Campo Requerido</label>
  <input type="text" class="form-control" placeholder="Ingrese texto...">
</div>

<div class="form-field">
  <label>Selección</label>
  <select class="form-control">
    <option>Opción 1</option>
    <option>Opción 2</option>
  </select>
</div>
```

### **TABLAS ESTÁNDAR:**
```html
<div class="table-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>Columna 1</th>
        <th>Columna 2</th>
      </tr>
    </thead>
    <tbody>
      <tr class="data-row">
        <td>Dato 1</td>
        <td class="action-cell">
          <div class="action-buttons">
            <button class="btn btn-sm btn-primary">Editar</button>
            <button class="btn btn-sm btn-danger">Eliminar</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### **ALERTAS ESTÁNDAR:**
```html
<div class="alert alert-info">
  <h4>Información</h4>
  <p>Mensaje informativo...</p>
</div>

<div class="alert alert-warning">
  <h4>Advertencia</h4>
  <p>Mensaje de advertencia...</p>
</div>

<div class="alert alert-danger">
  <h4>Error</h4>
  <p>Mensaje de error...</p>
</div>

<div class="alert alert-success">
  <h4>Éxito</h4>
  <p>Mensaje de éxito...</p>
</div>
```

### **LAYOUT ESTÁNDAR:**
```html
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <p>Columna de 6</p>
    </div>
    <div class="col-md-6">
      <p>Columna de 6</p>
    </div>
  </div>
</div>
```

## 🔧 **VARIABLES CSS DISPONIBLES**

### **COLORES:**
```scss
--sudbank-color-primary: #667eea
--sudbank-color-secondary: #6c757d
--sudbank-color-success: #28a745
--sudbank-color-danger: #dc3545
--sudbank-color-warning: #ffc107
--sudbank-color-info: #17a2b8
```

### **ESPACIADO:**
```scss
--sudbank-spacing-xs: 4px
--sudbank-spacing-sm: 8px
--sudbank-spacing-md: 16px
--sudbank-spacing-lg: 24px
--sudbank-spacing-xl: 32px
--sudbank-spacing-2xl: 48px
```

### **TIPOGRAFÍA:**
```scss
--sudbank-font-size-sm: 12px
--sudbank-font-size-base: 14px
--sudbank-font-size-lg: 16px
--sudbank-font-size-xl: 18px
--sudbank-font-size-2xl: 24px
--sudbank-font-size-3xl: 32px
```

## 📱 **RESPONSIVE DESIGN**

### **BREAKPOINTS:**
- **Mobile**: `max-width: 768px`
- **Tablet**: `max-width: 1024px`
- **Desktop**: `min-width: 1025px`

### **CLASES RESPONSIVE:**
```html
<!-- Ocultar en mobile -->
<div class="d-none d-md-block">Visible solo en desktop</div>

<!-- Mostrar solo en mobile -->
<div class="d-block d-md-none">Visible solo en mobile</div>
```

## 🚫 **ANTIPATRONES COMUNES**

### **❌ NO HACER:**
```scss
// ❌ Duplicar estilos de botones
.my-button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}

// ❌ Definir colores personalizados
.my-component {
  background: #f0f0f0; // ❌ Usar variable CSS
}

// ❌ Crear modales personalizados
.my-modal {
  position: fixed;
  top: 0;
  left: 0;
  // ... más código duplicado
}
```

### **✅ HACER:**
```scss
// ✅ Usar clases estándar
<button class="btn btn-primary">Mi Botón</button>

// ✅ Usar variables CSS
.my-component {
  background: var(--sudbank-bg-light);
}

// ✅ Usar clases de modal estándar
<div class="modal-overlay">
  <div class="modal-content">
    <!-- contenido del modal -->
  </div>
</div>
```

## 📚 **EJEMPLOS DE IMPLEMENTACIÓN**

### **DASHBOARD TÍPICO:**
```html
<div class="l01-main-container">
  <!-- Header estándar -->
  <div class="header">
    <h1>Dashboard L01</h1>
    <p class="subtitle">Gestión de Emisores y Custodios</p>
  </div>

  <!-- Indicador de modo -->
  <div class="data-mode-indicator real-mode">
    <div class="mode-badge">
      <i class="fas fa-database"></i>
      <span>Modo Real</span>
      <button class="btn btn-sm btn-outline-primary">Cambiar</button>
    </div>
  </div>

  <!-- Acciones -->
  <div class="l01-actions">
    <button class="btn btn-primary action-button">
      <i class="fas fa-plus"></i> Nuevo Emisor
    </button>
    <button class="btn btn-secondary action-button">
      <i class="fas fa-upload"></i> Importar
    </button>
  </div>

  <!-- Filtros -->
  <div class="l01-filters">
    <div class="filter-row">
      <div class="form-field filter-field">
        <label>Buscar</label>
        <input type="text" class="form-control" placeholder="Buscar emisor...">
      </div>
      <div class="form-field filter-field">
        <label>Estado</label>
        <select class="form-control">
          <option>Todos</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Tabla -->
  <div class="l01-table-container">
    <div class="table-container">
      <table class="data-table">
        <!-- contenido de la tabla -->
      </table>
    </div>
  </div>
</div>
```

## 🔍 **VERIFICACIÓN DE CALIDAD**

### **CHECKLIST ANTES DE COMMIT:**
- [ ] ¿Se usan las clases estándar para modales?
- [ ] ¿Se usan las clases estándar para botones?
- [ ] ¿Se usan las variables CSS para colores?
- [ ] ¿Se eliminaron estilos duplicados?
- [ ] ¿Se mantiene solo lo específico en CSS locales?

### **COMANDOS DE VERIFICACIÓN:**
```bash
# Verificar compilación SCSS
ng build --prod

# Verificar que no hay errores de CSS
ng lint

# Verificar que el servidor funciona
ng serve
```

## 📞 **SOPORTE Y CONTACTO**

### **RESPONSABLE:**
- **Desarrollador**: Christian Aguirre
- **Fecha de Creación**: Diciembre 2024
- **Versión**: 1.0.0

### **CANALES DE SOPORTE:**
- **Issues**: Crear issue en GitHub
- **Documentación**: Este README
- **Estándares**: Seguir este documento

---

## 📈 **MÉTRICAS DE ÉXITO**

### **ANTES (ANTES DE LA REFACTORIZACIÓN):**
- **CSS General**: 799 líneas
- **CSS Locales**: 2,475 líneas (825 × 3)
- **Total**: 3,274 líneas
- **Duplicación**: 75% del código

### **DESPUÉS (DESPUÉS DE LA REFACTORIZACIÓN):**
- **CSS General**: ~1,200 líneas (incluyendo componentes)
- **CSS Locales**: ~150 líneas (solo específico)
- **Total**: ~1,350 líneas
- **Reducción**: 60% del código total
- **Mantenibilidad**: ⭐⭐⭐⭐⭐ (5/5)
- **Consistencia**: ⭐⭐⭐⭐⭐ (5/5)
- **Escalabilidad**: ⭐⭐⭐⭐⭐ (5/5)

---

**🎯 RECUERDA: Los estilos centralizados son OBLIGATORIOS. Los estilos locales solo para lo ESPECÍFICO del componente.**
