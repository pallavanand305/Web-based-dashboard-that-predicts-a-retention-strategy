import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-api-gateway-url.amazonaws.com/dev'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiService = {
  // Get latest scores with filters
  getLatestScores: (params = {}) => 
    api.get('/scores/latest', { params }),
  
  // Get individual customer score
  getCustomerScore: (customerId) => 
    api.get(`/customers/${customerId}/score`),
  
  // Get aggregated customer data
  getAggregatedCustomers: (params = {}) => 
    api.get('/customers', { params: { agg: true, ...params } }),
  
  // Get upload URL for CSV
  getUploadUrl: () => 
    api.post('/ingest/upload-url'),
  
  // Upload CSV file
  uploadFile: (url, file) => 
    axios.put(url, file, { headers: { 'Content-Type': 'text/csv' } })
}

export default api