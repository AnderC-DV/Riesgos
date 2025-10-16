import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email, password) => {
        // TODO: Conectar con endpoint del backend
        // const response = await apiClient.post('/auth/login', { email, password })
        // set({ isAuthenticated: true, user: response.data.user })
        console.log('Intentando login:', { email, password })
      },
      logout: () => {
        set({ isAuthenticated: false, user: null })
      },
      setUser: (user) => {
        set({ isAuthenticated: true, user })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
