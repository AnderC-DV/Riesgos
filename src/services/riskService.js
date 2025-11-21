import { apiClient } from './apiClient'

const RISK_ENDPOINT = '/api/v1/risks/'

const riskService = {
  getRisks: async (params = {}) => {
    const response = await apiClient.get(RISK_ENDPOINT, { params })
    return response.data
  },
}

export default riskService
