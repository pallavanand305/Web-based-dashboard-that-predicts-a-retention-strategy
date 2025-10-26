import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetItemCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(client)

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

const getKeyDriver = (customer) => {
  if (customer.paymentStatus === 'failed') return 'Failed Payments'
  if ((customer.openTickets || 0) > 5) return 'Open Tickets'
  if ((customer.usageDrop || 0) > 50) return 'Usage Drop'
  return 'General Risk'
}

export const getScore = async (event) => {
  try {
    const { id } = event.pathParameters
    
    // Mock customer data
    const mockCustomer = {
      customerId: id,
      name: `Customer ${id}`,
      usageDrop: Math.random() * 80,
      openTickets: Math.floor(Math.random() * 10),
      paymentStatus: Math.random() > 0.7 ? 'failed' : 'active',
      segment: ['Enterprise', 'Mid-Market', 'SMB'][Math.floor(Math.random() * 3)]
    }
    
    // Calculate scores for 3 segments with equal weightage
    const segments = ['Enterprise', 'Mid-Market', 'SMB']
    const segmentScores = segments.map(segment => {
      const segmentCustomer = { ...mockCustomer, segment }
      return calculateHealthScore(segmentCustomer)
    })
    
    // Aggregate with equal weightage (33.33% each)
    const aggregatedHealthScore = Math.round(
      segmentScores.reduce((sum, score) => sum + score, 0) / 3
    )
    const riskScore = calculateRiskScore(aggregatedHealthScore)
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: id,
        healthScore: aggregatedHealthScore,
        riskScore,
        segmentScores: {
          Enterprise: segmentScores[0],
          'Mid-Market': segmentScores[1],
          SMB: segmentScores[2]
        },
        keyDriver: getKeyDriver(mockCustomer)
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

export const getAggregated = async (event) => {
  try {
    const { limit = 5 } = event.queryStringParameters || {}
    
    // Mock aggregated customer data
    const mockCustomers = Array.from({ length: 20 }, (_, i) => {
      const customer = {
        id: `C${String(i + 1).padStart(3, '0')}`,
        name: `Customer ${String.fromCharCode(65 + i)}`,
        usageDrop: Math.random() * 80,
        openTickets: Math.floor(Math.random() * 10),
        paymentStatus: Math.random() > 0.7 ? 'failed' : 'active'
      }
      
      const healthScore = calculateHealthScore(customer)
      const riskScore = calculateRiskScore(healthScore)
      
      return {
        ...customer,
        healthScore,
        riskScore,
        keyDriver: getKeyDriver(customer),
        combinedRisk: (healthScore + riskScore) / 2
      }
    })
    
    // Sort by combined risk (descending) and take top N
    const topRiskyCustomers = mockCustomers
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, parseInt(limit) || 5)
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customers: topRiskyCustomers
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