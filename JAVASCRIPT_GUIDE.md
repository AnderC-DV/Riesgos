# 🎓 Guía: Desarrollo en JavaScript (Sin TypeScript)

## 📌 Conceptos Básicos

### Componente Funcional Simple

```javascript
// ANTES (TypeScript)
interface Props {
  title: string
  onClick: () => void
}

export default function MyComponent({ title, onClick }: Props) {
  return <button onClick={onClick}>{title}</button>
}

// AHORA (JavaScript)
export default function MyComponent({ title, onClick }) {
  return <button onClick={onClick}>{title}</button>
}
```

### Con Props Default

```javascript
export default function Button({ 
  variant = 'primary',
  size = 'md',
  children,
  ...props 
}) {
  return (
    <button className={`btn-${variant} btn-${size}`} {...props}>
      {children}
    </button>
  )
}
```

---

## 🔌 Usando Hooks (sin tipos)

### useState

```javascript
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Juan')

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  )
}
```

### useEffect

```javascript
import { useEffect, useState } from 'react'
import apiClient from '@/services/apiClient'

export default function RiskList() {
  const [risks, setRisks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRisks = async () => {
      try {
        const response = await apiClient.get('/risks')
        setRisks(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRisks()
  }, []) // Se ejecuta solo al montar

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {risks.map(risk => (
        <li key={risk.id}>{risk.description}</li>
      ))}
    </ul>
  )
}
```

### useContext

```javascript
import { createContext, useContext, useState } from 'react'

// Crear contexto
const ThemeContext = createContext()

// Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook para usar
export function useTheme() {
  return useContext(ThemeContext)
}

// Usar en componente
export function MyComponent() {
  const { theme, setTheme } = useTheme()
  return <button onClick={() => setTheme('dark')}>Cambiar tema</button>
}
```

---

## 🏪 Usando Zustand (sin tipos)

### Store Simple

```javascript
import { create } from 'zustand'

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

### Store con Persistencia

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: (userData) => {
        set({ user: userData, isAuthenticated: true })
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      getUser: () => get().user,
    }),
    {
      name: 'auth-storage', // Nombre de la key en localStorage
    }
  )
)
```

### Usar Store en Componentes

```javascript
import { useAuthStore } from '@/store/authStore'

export default function UserProfile() {
  const { user, logout } = useAuthStore()

  return (
    <div>
      <p>Bienvenido: {user?.name}</p>
      <button onClick={logout}>Salir</button>
    </div>
  )
}
```

---

## 🔗 Llamadas a API (Axios)

### GET

```javascript
import apiClient from '@/services/apiClient'

// En un useEffect
useEffect(() => {
  const fetchRisks = async () => {
    try {
      const response = await apiClient.get('/risks')
      console.log(response.data) // Array de riesgos
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  fetchRisks()
}, [])
```

### POST

```javascript
const createRisk = async (riskData) => {
  try {
    const response = await apiClient.post('/risks', {
      description: riskData.description,
      probability: riskData.probability,
      impact: riskData.impact,
    })
    console.log('Riesgo creado:', response.data)
    return response.data
  } catch (error) {
    console.error('Error:', error.response?.data?.message)
  }
}
```

### PUT

```javascript
const updateRisk = async (riskId, updates) => {
  try {
    const response = await apiClient.put(`/risks/${riskId}`, updates)
    return response.data
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### DELETE

```javascript
const deleteRisk = async (riskId) => {
  try {
    await apiClient.delete(`/risks/${riskId}`)
    console.log('Riesgo eliminado')
  } catch (error) {
    console.error('Error:', error)
  }
}
```

---

## 📋 Trabajar con Formularios

### Formulario Simple

```javascript
import { useState } from 'react'

export default function RiskForm() {
  const [formData, setFormData] = useState({
    description: '',
    probability: 1,
    impact: 1,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Enviando:', formData)
    // Aquí llamarías a la API
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción del riesgo"
        className="w-full px-4 py-2 border rounded"
      />

      <select
        name="probability"
        value={formData.probability}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
      >
        <option value={1}>Baja</option>
        <option value={2}>Media</option>
        <option value={3}>Alta</option>
        <option value={4}>Muy Alta</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  )
}
```

---

## 🎨 Estilos en JavaScript

### Con clases Tailwind

```javascript
export default function Card({ title, children, highlighted }) {
  return (
    <div className={`
      p-6 rounded-lg shadow
      ${highlighted ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}
      border
    `}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      {children}
    </div>
  )
}
```

### Usando clsx

```javascript
import clsx from 'clsx'

export default function Button({ variant = 'primary', size = 'md', children }) {
  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  const sizeClass = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button className={clsx(
      'rounded-lg font-semibold transition',
      variantClass[variant],
      sizeClass[size]
    )}>
      {children}
    </button>
  )
}
```

---

## 📍 Routing con React Router

### Definir rutas

```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

export default function App() {
  const isAuthenticated = true // de tu store

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {isAuthenticated ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}
```

### Navegar

```javascript
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/') // Ir a home
  }

  return <button onClick={handleSuccess}>Ingresar</button>
}
```

---

## ⚠️ Validaciones Comunes

### Validar Email

```javascript
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
```

### Validar Número

```javascript
const validateNumber = (value, min, max) => {
  const num = Number(value)
  return !isNaN(num) && num >= min && num <= max
}
```

### Validar Formulario

```javascript
const validateForm = (formData) => {
  const errors = {}

  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'La descripción es requerida'
  }

  if (!formData.probability || formData.probability < 1 || formData.probability > 4) {
    errors.probability = 'La probabilidad debe estar entre 1 y 4'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
```

---

## 🐛 Debugging en JavaScript

### console.log

```javascript
const handleClick = () => {
  console.log('Click realizado')
  console.warn('Advertencia')
  console.error('Error')
}
```

### Usar DevTools

1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Console"
3. Escribe comandos JavaScript directamente

```javascript
// Ver estado de Zustand
localStorage.getItem('auth-storage')

// Ver valor de una variable
console.log(myVariable)
```

---

## 🎯 Mejores Prácticas

### ✅ Hacer

```javascript
// Nombres descriptivos
const handleUserLogout = () => {}

// Componentizar
export default function UserCard({ user }) {}

// Usar hooks correctamente
useEffect(() => {
  // Efecto
}, [dependencies])

// Manejar errores
try {
  await apiClient.post('/data')
} catch (error) {
  console.error(error)
}
```

### ❌ Evitar

```javascript
// Nombres cortos y confusos
const h = () => {}

// Componentes monolíticos
function App() { /* 500+ líneas */ }

// useEffect sin dependencias
useEffect(() => {})

// Ignorar errores
apiClient.post('/data')
```

---

## 📚 Resumen Rápido

| Necesidad | JavaScript |
|-----------|-----------|
| Estado | `useState()` |
| Efectos | `useEffect()` |
| Contexto | `createContext()` + `useContext()` |
| Estado global | Zustand |
| HTTP | Axios + apiClient |
| Estilos | Tailwind + clsx |
| Routing | React Router |
| Local Storage | localStorage API |

---

**¡Listo para desarrollar con JavaScript! 🚀**

```bash
npm install
npm run dev
```
