import { apiClient } from './apiClient'
import mockAuthService from './mockAuth'

// Usar mock cuando el backend no esté disponible
const USE_MOCK_AUTH = true // Cambiar a false cuando hayas un backend real

export const authService = {
  login: async (payload) => {
    if (USE_MOCK_AUTH) {
      try {
        return await mockAuthService.login(payload.email, payload.password)
      } catch (error) {
        throw error
      }
    }
    
    try {
      const response = await apiClient.post('/auth/login', payload)
      return response.data
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    if (USE_MOCK_AUTH) {
      localStorage.removeItem('authToken')
      return { ok: true }
    }
    
    try {
      await apiClient.post('/auth/logout')
      localStorage.removeItem('authToken')
    } catch (error) {
      console.error('Error en logout:', error)
    }
  },

  validateToken: async () => {
    const token = localStorage.getItem('authToken')
    if (!token) return false

    if (USE_MOCK_AUTH) {
      try {
        const result = await mockAuthService.validateToken(token)
        return result.ok
      } catch {
        return false
      }
    }

    try {
      await apiClient.get('/auth/validate')
      return true
    } catch {
      return false
    }
  },
}

export default authService
