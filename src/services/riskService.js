import { apiClient } from './apiClient'

const RISK_ENDPOINT = '/api/v1/risks/'

const riskService = {
  getRisks: async (params = {}) => {
    const response = await apiClient.get(RISK_ENDPOINT, { params })
    return response.data
  },
  createRisk: async (payload) => {
    const response = await apiClient.post(RISK_ENDPOINT, payload)
    return response.data
  },
}

export default riskService
