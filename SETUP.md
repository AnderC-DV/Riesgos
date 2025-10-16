# 🎯 PRÓXIMOS PASOS - INSTRUCCIONES DE INSTALACIÓN Y EJECUCIÓN

## 1️⃣ Abre VS Code en esta carpeta

```bash
code .
```

O abre la carpeta directamente desde VS Code.

## 2️⃣ Instala las dependencias

Abre la terminal en VS Code (Ctrl + `) y ejecuta:

```bash
npm install
```

Esto descargará todas las librerías necesarias (~500MB).

## 3️⃣ Inicia el servidor de desarrollo

```bash
npm run dev
```

Verás algo como:

```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

La aplicación se abrirá automáticamente en tu navegador.

## 4️⃣ Credentials de Prueba (Temporales)

**Nota**: Estos son valores temporales. Cuando el backend esté listo, usará autenticación real.

Para ahora, el login aceptará cualquier email/password (está en `src/store/authStore.ts`).

## 📚 Estructura que hemos creado

```
Riesgos/
├── src/
│   ├── App.tsx                          # Rutas principales
│   ├── main.tsx                         # Punto de entrada
│   ├── index.css                        # Estilos Tailwind
│   ├── pages/                           # Páginas (7 archivos)
│   │   ├── LoginPage.tsx               # Login moderno
│   │   ├── RiskDashboard.tsx           # Dashboard principal
│   │   ├── RiskAnalysis.tsx            # Análisis de riesgos
│   │   ├── Controls.tsx                # Gestión de controles
│   │   ├── Assets.tsx                  # Inventario de activos
│   │   ├── Reports.tsx                 # Reportes
│   │   └── Administration.tsx          # Admin panel
│   ├── layouts/
│   │   └── DashboardLayout.tsx         # Layout con sidebar
│   ├── store/
│   │   ├── authStore.ts                # Store de autenticación
│   │   └── riskStore.ts                # Store de riesgos
│   ├── services/
│   │   ├── apiClient.ts                # Cliente HTTP con Axios
│   │   └── authService.ts              # Servicio de auth
├── package.json                         # Dependencias
├── vite.config.ts                      # Config de Vite
├── tsconfig.json                       # Config de TypeScript
├── tailwind.config.js                  # Config de Tailwind
├── README.md                           # Documentación
└── index.html                          # HTML base
```

## 🎨 Diseño Implementado

✅ **Interfaz Moderna y Elegante**
- Colores: Azul profesional (#2563eb)
- Sidebar navegable con 6 secciones
- Login con iconos y diseño responsive
- Cards, botones y estilos consistentes

✅ **TypeScript en todo el código**
- Tipos definidos
- Autocompletado en el editor
- Validación en tiempo de compilación

✅ **Cascaron Funcional**
- Puedes navegar entre todas las secciones
- Login/Logout funcional
- Sidebar colapsable
- Responsive en móvil

## 🔌 Conectar el Backend

Cuando tu backend esté listo:

### Paso 1: Actualizar URL del API

Edita `src/services/apiClient.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3001/api'  // Cambiar por tu URL
```

### Paso 2: Habilitar Login Real

En `src/store/authStore.ts`, descomenta:

```typescript
login: async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password })
  set({ isAuthenticated: true, user: response.data.user })
}
```

### Paso 3: Conectar Datos de Riesgos

En `src/pages/RiskDashboard.tsx`, importa `useRiskStore` y:

```typescript
const { risks, setRisks } = useRiskStore()

useEffect(() => {
  apiClient.get('/risks')
    .then(res => setRisks(res.data))
}, [])
```

## 🚀 Build para Producción

```bash
npm run build
```

Generará carpeta `dist/` lista para desplegar.

## 📋 Checklist de lo que falta

- [ ] Backend con endpoints
- [ ] Conexión de datos en tiempo real
- [ ] Componentes de matriz de riesgos (gráfico)
- [ ] Formularios completos para crear/editar
- [ ] Validaciones
- [ ] Tests
- [ ] Documentación de API

## ⚠️ Errores Comunes

**"Cannot find module 'react'"**
→ Ejecuta `npm install`

**"localhost:3000 está ocupado"**
→ Cambiar puerto en `vite.config.ts` o kill el proceso

**CSS no se carga**
→ Reinicia el servidor: Ctrl+C y `npm run dev`

## 💡 Tips

1. **Hot reload**: Los cambios se ven automáticamente
2. **DevTools**: Instala "React Developer Tools" en Chrome
3. **Zustand DevTools**: Para debuggear el estado global
4. **VS Code Extensions recomendadas**:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - Thunder Client (para probar API)

## 📞 Dudas sobre la Integración

Si necesitas ayuda con la integración:

1. ¿Qué endpoints tiene tu backend?
2. ¿Qué formato devuelve?
3. ¿Necesita tokens JWT?
4. ¿Qué validaciones necesita?

---

**¡Listo para empezar! 🚀**

```bash
npm install && npm run dev
```
