import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(client)

// Simple ML model for health score prediction
const calculateHealthScore = (customer) => {
  const usageWeight = 0.4
  const ticketsWeight = 0.3
  const paymentsWeight = 0.3
  
  const usageScore = Math.max(0, 100 - (customer.usageDrop || 0))
  const ticketsScore = Math.max(0, 100 - (customer.openTickets || 0) * 10)
  const paymentsScore = customer.paymentStatus === 'failed' ? 0 : 100
  
  return Math.round(
    usageScore * usageWeight + 
    ticketsScore * ticketsWeight + 
    paymentsScore * paymentsWeight
  )
}

const calculateRiskScore = (healthScore) => {
  return Math.max(0, 100 - healthScore)
}

export const getLatest = async (event) => {
  try {
    const { segment, region, limit = 10 } = event.queryStringParameters || {}
    
    // Mock data for demonstration
    const mockScores = [
      { segment: 'High Risk', count: 45, region: 'US' },
      { segment: 'Medium Risk', count: 120, region: 'US' },
      { segment: 'Low Risk', count: 235, region: 'US' },
      { segment: 'High Risk', count: 30, region: 'EU' },
      { segment: 'Medium Risk', count: 85, region: 'EU' },
      { segment: 'Low Risk', count: 180, region: 'EU' }
    ]
    
    let filteredScores = mockScores
    if (segment) {
      filteredScores = filteredScores.filter(s => s.segment === segment)
    }
    if (region) {
      filteredScores = filteredScores.filter(s => s.region === region)
    }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scores: filteredScores.slice(0, parseInt(limit))
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    }
  }
}