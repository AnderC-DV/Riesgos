# 📖 Guía de Desarrollo - Matriz de Riesgos

## Bienvenida 👋

Has creado un proyecto **moderno, escalable y profesional** para gestionar riesgos operativos. Este documento te guiará por todo lo que necesitas saber.

---

## 🎯 Visión General del Proyecto

### ¿Qué es?
Una **aplicación web moderna** que permite a las organizaciones:
- Identificar y evaluar riesgos operativos
- Diseñar controles para mitigar riesgos
- Gestionar un inventario de activos
- Generar reportes y análisis

### ¿Por qué React + Vite + TypeScript + Tailwind?
- **React**: Componentes reutilizables y eficientes
- **Vite**: Desarrollo rápido (hot reload instant)
- **TypeScript**: Código seguro y autodocumentado
- **Tailwind**: Diseño moderno sin escribir CSS
- **Zustand**: Estado global simple y performante

---

## 🚀 Comenzar (Quick Start)

### 1. Terminal - Instalar todo
```bash
cd "c:\Users\Usuario\Documents\Riesgos"
npm install
```

### 2. Iniciar servidor
```bash
npm run dev
```

### 3. Abrir en navegador
```
http://localhost:3000
```

---

## 📂 Estructura del Código

```
src/
├── pages/              # Páginas completas
│                       # Cada página es una vista principal
│
├── layouts/            # Layouts reutilizables
│                       # DashboardLayout con sidebar
│
├── components/         # Componentes pequeños y reutilizables
│   ├── Card.tsx       # Contenedor genérico
│   └── Button.tsx     # Botón personalizable
│
├── store/              # Estado global (Zustand)
│   ├── authStore.ts   # Usuario y autenticación
│   └── riskStore.ts   # Datos de riesgos
│
├── services/           # Conecta con el backend
│   ├── apiClient.ts   # Configuración Axios
│   └── authService.ts # Métodos de API auth
│
├── types/              # TypeScript interfaces
│   └── index.ts       # Tipos compartidos
│
├── App.tsx             # Rutas principales
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

---

## 🎨 Componentes Explicados

### Pages (Páginas Completas)

#### LoginPage.tsx
```
- Diseño elegante con gradiente azul
- Formulario con validación básica
- Conexión a authStore
- Redirige a dashboard después de login
```

#### RiskDashboard.tsx
```
- Página principal después de login
- Grid de estadísticas (placeholder)
- Área para matriz de riesgos
- TODO: Conectar datos del backend
```

#### RiskAnalysis.tsx, Controls.tsx, Assets.tsx, Reports.tsx, Administration.tsx
```
- Páginas básicas con estructura
- Buttons placeholder
- Listos para ser completados
```

### Layouts

#### DashboardLayout.tsx
```
- Sidebar con navegación
- Top bar con info del usuario
- Salida/Logout
- Responsive (sidebar colapsable)
- Muestra <Outlet /> para el contenido
```

### Componentes Reutilizables

#### Card.tsx
```typescript
<Card title="Mi Tarjeta" footer={<button>OK</button>}>
  Contenido aquí
</Card>
```

#### Button.tsx
```typescript
<Button variant="primary" size="lg" fullWidth loading={isLoading}>
  Click me
</Button>
```

---

## 🔐 Autenticación (Auth Flow)

### Flujo Actual

```
1. Usuario va a /login
2. Ingresa email y password
3. LoginPage → authService.login()
4. Se guarda token en localStorage
5. Se setea usuario en authStore
6. Se redirige a /
7. App.tsx verifica isAuthenticated
8. Si OK → muestra DashboardLayout
9. Si NO → redirige a /login
```

### Variables Guardadas

```javascript
localStorage['authToken']      // Token JWT
localStorage['auth-storage']   // Usuario (Zustand)
```

---

## 📡 Integración con Backend

### Step 1: URL del Backend

En `src/services/apiClient.ts`:
```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api'
```

En `.env.local`:
```env
VITE_API_URL=http://localhost:3001/api
```

### Step 2: Endpoints Esperados

```
POST   /auth/login          → { token, user }
POST   /auth/logout         → { ok }
GET    /auth/validate       → { ok }

GET    /risks               → Risk[]
POST   /risks               → { id, ... }
GET    /risks/:id           → Risk
PUT    /risks/:id           → Risk
DELETE /risks/:id           → { ok }

GET    /controls            → Control[]
POST   /controls            → { id, ... }
...

GET    /assets              → Asset[]
...
```

### Step 3: Cómo Usar

```typescript
// En un componente
import { useEffect } from 'react'
import { useRiskStore } from '@/store/riskStore'
import apiClient from '@/services/apiClient'

export default function RiskDashboard() {
  const { risks, setRisks } = useRiskStore()

  useEffect(() => {
    apiClient.get('/risks')
      .then(res => setRisks(res.data))
      .catch(err => console.error(err))
  }, [setRisks])

  return (
    <div>
      {risks.map(risk => (
        <div key={risk.id}>{risk.description}</div>
      ))}
    </div>
  )
}
```

---

## 🛠️ Tareas Comunes

### Agregar una Nueva Página

1. Crear archivo en `src/pages/MiPagina.tsx`
```typescript
export default function MiPagina() {
  return (
    <div className="space-y-6">
      <h1>Título</h1>
      {/* Contenido */}
    </div>
  )
}
```

2. Agregar ruta en `src/App.tsx`
```typescript
<Route path="/mi-pagina" element={<MiPagina />} />
```

3. Agregar botón en sidebar (`DashboardLayout.tsx`)
```typescript
const menuItems = [
  // ... items existentes
  { label: 'Mi Página', path: '/mi-pagina', icon: Icon },
]
```

### Agregar un Componente

1. Crear en `src/components/MiComponente.tsx`
```typescript
interface Props {
  titulo: string
  onClick?: () => void
}

export default function MiComponente({ titulo, onClick }: Props) {
  return <div onClick={onClick}>{titulo}</div>
}
```

2. Usar en una página
```typescript
import MiComponente from '@/components/MiComponente'

export default function MiPagina() {
  return <MiComponente titulo="Hola" onClick={() => console.log('click')} />
}
```

### Agregar Estado Global

1. Crear store en `src/store/miStore.ts`
```typescript
import { create } from 'zustand'

interface MiStore {
  miDato: string
  setMiDato: (valor: string) => void
}

export const useMiStore = create<MiStore>((set) => ({
  miDato: '',
  setMiDato: (valor) => set({ miDato: valor }),
}))
```

2. Usar en componente
```typescript
import { useMiStore } from '@/store/miStore'

export default function MiComponente() {
  const { miDato, setMiDato } = useMiStore()
  return (
    <div>
      <p>{miDato}</p>
      <button onClick={() => setMiDato('nuevo valor')}>
        Cambiar
      </button>
    </div>
  )
}
```

---

## 🎨 Tailwind CSS - Cheat Sheet

```html
<!-- Spacing -->
<div class="m-4">        <!-- margin -->
<div class="p-4">        <!-- padding -->
<div class="space-y-4">  <!-- gap vertical -->
<div class="space-x-4">  <!-- gap horizontal -->

<!-- Sizing -->
<div class="w-full">     <!-- width: 100% -->
<div class="h-screen">   <!-- height: 100vh -->
<div class="w-1/2">      <!-- width: 50% -->

<!-- Colors -->
<div class="bg-blue-600">      <!-- background -->
<div class="text-gray-900">    <!-- text color -->
<div class="border-gray-200">  <!-- border color -->

<!-- Flexbox -->
<div class="flex">             <!-- display: flex -->
<div class="flex-col">         <!-- flex-direction: column -->
<div class="items-center">     <!-- align-items -->
<div class="justify-between">  <!-- justify-content -->

<!-- Grid -->
<div class="grid grid-cols-3">  <!-- CSS grid 3 colunas -->
<div class="gap-4">             <!-- gap entre items -->

<!-- Responsive -->
<div class="md:grid-cols-2">    <!-- medium+ screens -->
<div class="lg:w-1/2">          <!-- large+ screens -->
```

---

## 🐛 Debugging

### Ver estado de Zustand
Instala extensión: "Redux DevTools" en Chrome
```javascript
// En consola
localStorage.getItem('auth-storage')
```

### Ver requests HTTP
En DevTools → Network tab
O instala "Thunder Client" en VS Code

### Logs en consola
```typescript
console.log('mensaje', datos)
console.warn('advertencia')
console.error('error')
```

---

## ✅ Checklist de Próximas Tareas

- [ ] Backend ready con endpoints
- [ ] Probar login con backend real
- [ ] Conectar GET /risks al dashboard
- [ ] Crear componente de matriz (heatmap)
- [ ] Formularios de crear/editar riesgos
- [ ] Validaciones de formularios
- [ ] Tests unitarios
- [ ] E2E tests
- [ ] Deployment a producción

---

## 📞 Tips Final

1. **Hot Reload**: Los cambios se ven al guardar automáticamente
2. **TypeScript**: Escribe tipos para todo, te ahorrará errores
3. **Componentes**: Mantén pequeños y reutilizables
4. **Commits Git**: Haz commits frecuentes con mensajes claros
5. **Tests**: Escribe tests mientras desarrollas, no después

---

**Creado con ❤️ para gestión de riesgos operativos**

Última actualización: 16 de Octubre de 2025
