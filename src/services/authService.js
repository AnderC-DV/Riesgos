import { apiClient } from './apiClient'

const formatErrorMessage = (error) => {
  const detail = error?.response?.data?.detail
  if (Array.isArray(detail) && detail.length) {
    return detail.map((item) => item.msg).join(', ')
  }
  return error?.response?.data?.message || 'Ocurrió un error inesperado'
}

export const authService = {
  login: async ({ email, password }) => {
    try {
      const formPayload = new URLSearchParams()
      formPayload.append('username', email)
      formPayload.append('password', password)
      formPayload.append('grant_type', 'password')

      const tokenResponse = await apiClient.post('/api/v1/login/access-token', formPayload, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      const token = tokenResponse.data?.access_token
      if (!token) {
        throw new Error('No se recibió token del backend')
      }

      localStorage.setItem('authToken', token)

      const userResponse = await apiClient.get('/api/v1/users/me')
      return {
        token,
        user: userResponse.data,
      }
    } catch (error) {
      throw new Error(formatErrorMessage(error))
    }
  },

  logout: () => {
    localStorage.removeItem('authToken')
  },

  validateToken: async () => {
    const token = localStorage.getItem('authToken')
    if (!token) return false

    try {
      const response = await apiClient.get('/api/v1/users/me')
      return response.data
    } catch {
      localStorage.removeItem('authToken')
      return false
    }
  },
}

export default authService
