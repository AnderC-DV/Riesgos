import { create } from 'zustand'
import riskService from '../services/riskService'

export const useRiskStore = create((set, get) => ({
  risks: [],
  loading: false,
  error: null,
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
}))
