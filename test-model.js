import RetentionModel from './backend/handlers/model.js'

// Generate test data
function generateTestData(count) {
  const data = []
  for (let i = 0; i < count; i++) {
    const customer = {
      customerId: `TEST${i}`,
      usageDrop: Math.random() * 100,
      openTickets: Math.floor(Math.random() * 15),
      paymentStatus: Math.random() > 0.8 ? 'failed' : 'active'
    }
    
    // Assign actual risk based on known patterns
    let actualRisk = 'Low Risk'
    if (customer.paymentStatus === 'failed' || customer.usageDrop > 70) {
      actualRisk = 'High Risk'
    } else if (customer.openTickets > 5 || customer.usageDrop > 40) {
      actualRisk = 'Medium Risk'
    }
    
    customer.actualRisk = actualRisk
    data.push(customer)
  }
  return data
}

// Test the model
const model = new RetentionModel()
const testData = generateTestData(500)
const results = model.validateModel(testData)

console.log(`Model Accuracy: ${results.accuracy.toFixed(2)}%`)
console.log(`Test Samples: ${testData.length}`)

// Show some predictions
console.log('\nSample Predictions:')
results.predictions.slice(0, 5).forEach(pred => {
  console.log(`Customer ${pred.customerId}: ${pred.segment} (${pred.healthScore}% health, ${pred.keyDriver})`)
})

export { generateTestData, RetentionModel }