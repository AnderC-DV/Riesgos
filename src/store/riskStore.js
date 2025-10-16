import { create } from 'zustand'

export const useRiskStore = create((set, get) => ({
  risks: [],
  setRisks: (risks) => set({ risks }),
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
}))
