// 🎭 Mock Authentication Service
// Este archivo simula un backend para desarrollo local
// En producción, reemplazar con llamadas reales al API

const MOCK_USERS = [
  {
    id: 'user-1',
    email: 'demo@empresa.com',
    password: '123456',
    name: 'Usuario Demo',
    role: 'admin'
  },
  {
    id: 'user-2',
    email: 'usuario@empresa.com',
    password: 'password123',
    name: 'Usuario Estándar',
    role: 'analyst'
  },
  {
    id: 'user-3',
    email: 'admin@empresa.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  }
]

// Simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const mockAuthService = {
  // Login simulado
  login: async (email, password) => {
    await delay(800) // Simular delay de red
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw {
        response: {
          status: 401,
          data: {
            message: 'Email o contraseña incorrectos'
          }
        }
      }
    }

    // Generar token simulado
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }))
    
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  },

  // Logout simulado
  logout: async () => {
    await delay(200)
    return { ok: true }
  },

  // Validar token simulado
  validateToken: async (token) => {
    await delay(300)
    try {
      const decoded = JSON.parse(atob(token))
      const user = MOCK_USERS.find(u => u.id === decoded.id)
      return user ? { ok: true, user } : { ok: false }
    } catch {
      return { ok: false }
    }
  }
}

export default mockAuthService
