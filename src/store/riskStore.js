import { create } from 'zustand'
import riskService from '../services/riskService'

export const useRiskStore = create((set, get) => ({
  risks: [],
  loading: false,
  error: null,
  creating: false,
  createError: null,
  setRisks: (risks) => set({ risks }),
  setError: (error) => set({ error }),
  addRisk: (risk) => set((state) => ({ risks: [...state.risks, risk] })),
  updateRisk: (id, updatedRisk) =>
    set((state) => ({
      risks: state.risks.map((r) => (r.id === id ? { ...r, ...updatedRisk } : r)),
    })),
  deleteRisk: (id) =>
    set((state) => ({
      risks: state.risks.filter((r) => r.id !== id),
    })),
  getRiskById: (id) => get().risks.find((r) => r.id === id),
  fetchRisks: async () => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      set({ error: 'Debes iniciar sesión para ver los riesgos.' })
      return
    }

    set({ loading: true, error: null })
    try {
      const risks = await riskService.getRisks()
      set({ risks })
    } catch (error) {
      set({ error: error.message || 'No se pudieron cargar los riesgos.' })
    } finally {
      set({ loading: false })
    }
  },
  createRisk: async (payload) => {
    if (!payload) throw new Error('Los datos del riesgo no pueden estar vacíos.')
    set({ creating: true, createError: null })
    try {
      const createdRisk = await riskService.createRisk(payload)
      set((state) => ({ risks: [createdRisk, ...state.risks] }))
      return createdRisk
    } catch (error) {
      const message = error?.message || 'No se pudo crear el riesgo.'
      set({ createError: message })
      throw new Error(message)
    } finally {
      set({ creating: false })
    }
  },
}))
