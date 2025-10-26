export const processUploadedData = async (event) => {
  try {
    // Mock data processing for demo
    const mockCustomers = [
      { customer_id: 'C001', name: 'Demo Customer 1', usage_drop: 75, open_tickets: 8, payment_status: 'failed' },
      { customer_id: 'C002', name: 'Demo Customer 2', usage_drop: 45, open_tickets: 3, payment_status: 'active' },
      { customer_id: 'C003', name: 'Demo Customer 3', usage_drop: 60, open_tickets: 12, payment_status: 'failed' }
    ]
    
    console.log('Mock data processing completed')
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Mock data ingestion completed',
        customersProcessed: mockCustomers.length
      })
    }
  } catch (error) {
    console.error('Data ingestion error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}