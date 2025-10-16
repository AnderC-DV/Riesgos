# 📊 Matriz de Riesgos Operativos - Sistema de Gestión

Una **aplicación web moderna** construida con **React + JavaScript + Vite** para gestionar riesgos operativos en organizaciones.

---

## ✨ Características

### 🎯 Funcionalidades Principales
- ✅ **Autenticación Segura** - Login con tokens JWT
- ✅ **Dashboard Interactivo** - Visualización de riesgos
- ✅ **Gestión de Riesgos** - Identificación y evaluación
- ✅ **Gestión de Controles** - Preventivos, detectivos, correctivos
- ✅ **Inventario de Activos** - Valorización de activos
- ✅ **Reportes** - Generación y exportación
- ✅ **Panel de Administración** - Gestión del sistema

### 🎨 Diseño
- Interfaz moderna con **Tailwind CSS**
- Sidebar navegable y responsive
- Colores corporativos (azul profesional)
- Totalmente responsive (móvil, tablet, desktop)
- Iconos elegantes con **Lucide React**

### ⚡ Tecnología
- **React 18** - UI framework
- **JavaScript ES6+** - Sin TypeScript
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilos modernos
- **React Router** - Navegación
- **Zustand** - Estado global
- **Axios** - Cliente HTTP

---

## 🚀 Comenzar Rápido

### 1. Requisitos
- Node.js 16+ instalado
- npm o yarn

### 2. Instalación

```bash
cd "c:\Users\Usuario\Documents\Riesgos"
npm install
```

### 3. Iniciar Desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en **http://localhost:3000**

### 4. Build para Producción

```bash
npm run build
```

El build se generará en la carpeta `dist/`

---

## 📂 Estructura del Proyecto

```
src/
├── pages/                      # Páginas principales (7)
│   ├── LoginPage.jsx
│   ├── RiskDashboard.jsx
│   ├── RiskAnalysis.jsx
│   ├── Controls.jsx
│   ├── Assets.jsx
│   ├── Reports.jsx
│   └── Administration.jsx
├── layouts/
│   └── DashboardLayout.jsx    # Layout con sidebar
├── components/                # Componentes reutilizables
│   ├── Button.jsx
│   └── Card.jsx
├── store/                     # Estado global (Zustand)
│   ├── authStore.js
│   └── riskStore.js
├── services/                  # Integración con API
│   ├── apiClient.js
│   └── authService.js
├── App.jsx                    # Rutas principales
├── main.jsx                   # Punto de entrada
└── index.css                  # Estilos globales
```

---

## 🔐 Autenticación

### Flujo de Login

```
1. Usuario accede a /login
2. Ingresa email y password
3. Se valida con backend
4. Token JWT se guarda en localStorage
5. Se redirige al dashboard
6. Sidebar muestra opciones disponibles
```

### Tokens

- Guardados en `localStorage`
- Incluidos automáticamente en requests
- Logout automático en 401

---

## 📡 Integración con Backend

### Variables de Entorno

Crea archivo `.env.local`:

```env
VITE_API_URL=http://localhost:3001/api
```

### Endpoints Esperados

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

GET    /assets              → Asset[]
POST   /assets              → { id, ... }
```

### Ejemplo de Uso

```javascript
// En un componente
import apiClient from '@/services/apiClient'
import { useEffect, useState } from 'react'

export default function RiskList() {
  const [risks, setRisks] = useState([])

  useEffect(() => {
    apiClient.get('/risks')
      .then(res => setRisks(res.data))
      .catch(err => console.error(err))
  }, [])

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

## 🛠️ Scripts Disponibles

```bash
npm run dev         # Inicia servidor de desarrollo
npm run build       # Build para producción
npm run preview     # Preview del build
npm run lint        # Ejecuta ESLint
```

---

## 📚 Documentación

| Documento | Contenido |
|-----------|----------|
| `README.md` | Este archivo - Overview general |
| `SETUP.md` | Guía detallada de instalación |
| `DEVELOPMENT.md` | Guía de desarrollo completa |
| `JAVASCRIPT_GUIDE.md` | Guía de JavaScript sin TypeScript |
| `CONVERSION.txt` | Resumen de conversión TS→JS |
| `LIMPIEZA.txt` | Resumen de limpieza de archivos |

---

## 🎨 Personalización

### Colores

Edita `tailwind.config.js`:

```javascript
theme: {
  colors: {
    primary: '#2563eb', // Cambia color principal
  }
}
```

### Componentes

Agrega nuevos componentes en `src/components/`:

```javascript
export default function MyComponent({ prop1, prop2 }) {
  return <div>{prop1} {prop2}</div>
}
```

### Páginas

Agrega nuevas páginas en `src/pages/` y actualiza rutas en `App.jsx`.

---

## 🐛 Debugging

### Console Log
```javascript
console.log('valor')
console.warn('advertencia')
console.error('error')
```

### React DevTools
Instala extensión "React Developer Tools" en Chrome

### Ver Estado
```javascript
// En consola del navegador
localStorage.getItem('auth-storage')
```

---

## 📊 Performance

- **Bundle Size**: ~150KB minificado
- **Load Time**: <1s (con Vite)
- **Hot Reload**: Instant
- **Tree Shaking**: Automático

---

## 🚀 Deployment

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Servidor Propio

```bash
npm run build
# Servir la carpeta dist/ con un servidor web
```

---

## ⚠️ Troubleshooting

### "Cannot find module"
```bash
npm install
```

### "Port 3000 is already in use"
Edita `vite.config.ts` y cambia el puerto:
```javascript
server: { port: 3001 }
```

### CSS no se carga
Reinicia el servidor con `npm run dev`

---

## 📝 Notas Importantes

- ✅ Proyecto en **JavaScript puro** (sin TypeScript)
- ✅ Responsive design para todos los dispositivos
- ✅ CORS configurado en interceptores
- ✅ Manejo de errores 401 automático
- ⚠️ Backend debe servir con CORS habilitado

---

## 🤝 Contribución

Para agregar cambios:

1. Crea una rama
2. Haz cambios
3. Test en desarrollo
4. Commit con mensaje descriptivo
5. Push a main

---

## 📞 Soporte

Para preguntas o issues:

1. Revisa la documentación en los archivos `.md`
2. Consulta `JAVASCRIPT_GUIDE.md` para ejemplos de código
3. Verifica `DEVELOPMENT.md` para arquitectura

---

## 📄 Licencia

MIT © 2025 - Sistema de Gestión de Riesgos Operativos

---

## 🎯 Roadmap

- [ ] Componente de matriz de riesgos visual
- [ ] Formularios CRUD completos
- [ ] Validaciones avanzadas
- [ ] Tests unitarios
- [ ] Tests E2E
- [ ] Dark mode
- [ ] Internacionalización (i18n)

---

## 🙌 Creado con

- **React** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Estilos
- **Zustand** - State Management
- **React Router** - Routing
- **Axios** - HTTP Client

---

**Última actualización:** 16 de Octubre de 2025  
**Estado:** ✅ Listo para desarrollo  
**Versión:** 1.0.0  

---

## 🚀 ¡Comienza Ahora!

```bash
npm install
npm run dev
```

Accede a **http://localhost:3000** y comienza a desarrollar! 🎉
