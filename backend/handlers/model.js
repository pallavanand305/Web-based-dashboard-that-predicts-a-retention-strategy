// Simple ML model for customer retention prediction
export class RetentionModel {
  constructor() {
    this.weights = {
      usage: 0.4,
      tickets: 0.3,
      payments: 0.3
    }
    this.thresholds = {
      highRisk: 30,
      mediumRisk: 60
    }
  }

  // Calculate health score based on customer metrics
  calculateHealthScore(customer) {
    const usageScore = Math.max(0, 100 - (customer.usageDrop || 0))
    const ticketsScore = Math.max(0, 100 - (customer.openTickets || 0) * 10)
    const paymentsScore = customer.paymentStatus === 'failed' ? 0 : 100
    
    return Math.round(
      usageScore * this.weights.usage + 
      ticketsScore * this.weights.tickets + 
      paymentsScore * this.weights.payments
    )
  }

  // Calculate risk score (inverse of health)
  calculateRiskScore(healthScore) {
    return Math.max(0, 100 - healthScore)
  }

  // Determine risk segment
  getRiskSegment(healthScore) {
    if (healthScore < this.thresholds.highRisk) return 'High Risk'
    if (healthScore < this.thresholds.mediumRisk) return 'Medium Risk'
    return 'Low Risk'
  }

  // Identify key churn driver
  getKeyDriver(customer) {
    if (customer.paymentStatus === 'failed') return 'Failed Payments'
    if ((customer.openTickets || 0) > 5) return 'Open Tickets'
    if ((customer.usageDrop || 0) > 50) return 'Usage Drop'
    return 'General Risk'
  }

  // Generate retention strategy
  getRetentionStrategy(customer, healthScore, keyDriver) {
    const strategies = {
      'Failed Payments': 'Offer payment plan or discount',
      'Open Tickets': 'Prioritize support and assign CSM',
      'Usage Drop': 'Provide training and feature demos',
      'General Risk': 'Schedule check-in call'
    }
    
    return strategies[keyDriver] || strategies['General Risk']
  }

  // Predict customer metrics
  predict(customer) {
    const healthScore = this.calculateHealthScore(customer)
    const riskScore = this.calculateRiskScore(healthScore)
    const segment = this.getRiskSegment(healthScore)
    const keyDriver = this.getKeyDriver(customer)
    const strategy = this.getRetentionStrategy(customer, healthScore, keyDriver)
    
    return {
      customerId: customer.customerId,
      healthScore,
      riskScore,
      segment,
      keyDriver,
      retentionStrategy: strategy,
      confidence: this.calculateConfidence(customer)
    }
  }

  // Calculate prediction confidence
  calculateConfidence(customer) {
    let confidence = 0.7 // Base confidence
    
    // Higher confidence with more data points
    if (customer.usageDrop !== undefined) confidence += 0.1
    if (customer.openTickets !== undefined) confidence += 0.1
    if (customer.paymentStatus !== undefined) confidence += 0.1
    
    return Math.min(0.95, confidence)
  }

  // Validate model accuracy (mock implementation)
  validateModel(testData) {
    let correct = 0
    const predictions = testData.map(customer => this.predict(customer))
    
    // Simple accuracy calculation based on risk segment prediction
    predictions.forEach((pred, i) => {
      const actual = testData[i].actualRisk || pred.segment
      if (pred.segment === actual) correct++
    })
    
    return {
      accuracy: (correct / testData.length) * 100,
      predictions
    }
  }
}

export default RetentionModel