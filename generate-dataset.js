import fs from 'fs'

// Generate training dataset (1000 records)
function generateTrainingData() {
  const data = []
  const segments = ['Enterprise', 'Mid-Market', 'SMB']
  const regions = ['US', 'EU', 'APAC']
  const names = ['Alpha Corp', 'Beta Inc', 'Gamma LLC', 'Delta Systems', 'Epsilon Tech']
  
  for (let i = 1; i <= 1000; i++) {
    const segment = segments[Math.floor(Math.random() * segments.length)]
    const region = regions[Math.floor(Math.random() * regions.length)]
    
    // Create realistic patterns
    let usageDrop = Math.random() * 100
    let openTickets = Math.floor(Math.random() * 20)
    let paymentStatus = 'active'
    
    // Introduce risk patterns
    if (Math.random() < 0.15) { // 15% high risk
      usageDrop = 60 + Math.random() * 40
      openTickets = 8 + Math.floor(Math.random() * 12)
      paymentStatus = Math.random() < 0.7 ? 'failed' : 'active'
    } else if (Math.random() < 0.35) { // 35% medium risk
      usageDrop = 30 + Math.random() * 40
      openTickets = 3 + Math.floor(Math.random() * 8)
      paymentStatus = Math.random() < 0.2 ? 'failed' : 'active'
    }
    
    data.push({
      customer_id: `C${String(i).padStart(4, '0')}`,
      name: `${names[Math.floor(Math.random() * names.length)]} ${i}`,
      usage_drop: usageDrop.toFixed(2),
      open_tickets: openTickets,
      payment_status: paymentStatus,
      region: region,
      segment: segment
    })
  }
  
  return data
}

// Generate test dataset (500 records)
function generateTestData() {
  const data = []
  const segments = ['Enterprise', 'Mid-Market', 'SMB']
  const regions = ['US', 'EU', 'APAC']
  const names = ['Test Corp', 'Validation Inc', 'QA Systems']
  
  for (let i = 1001; i <= 1500; i++) {
    const segment = segments[Math.floor(Math.random() * segments.length)]
    const region = regions[Math.floor(Math.random() * regions.length)]
    
    let usageDrop = Math.random() * 100
    let openTickets = Math.floor(Math.random() * 20)
    let paymentStatus = 'active'
    
    // Similar risk patterns for testing
    if (Math.random() < 0.15) {
      usageDrop = 60 + Math.random() * 40
      openTickets = 8 + Math.floor(Math.random() * 12)
      paymentStatus = Math.random() < 0.7 ? 'failed' : 'active'
    } else if (Math.random() < 0.35) {
      usageDrop = 30 + Math.random() * 40
      openTickets = 3 + Math.floor(Math.random() * 8)
      paymentStatus = Math.random() < 0.2 ? 'failed' : 'active'
    }
    
    data.push({
      customer_id: `T${String(i).padStart(4, '0')}`,
      name: `${names[Math.floor(Math.random() * names.length)]} ${i}`,
      usage_drop: usageDrop.toFixed(2),
      open_tickets: openTickets,
      payment_status: paymentStatus,
      region: region,
      segment: segment
    })
  }
  
  return data
}

// Convert to CSV
function arrayToCSV(data) {
  const headers = Object.keys(data[0])
  const csvRows = [headers.join(',')]
  
  for (const row of data) {
    const values = headers.map(header => row[header])
    csvRows.push(values.join(','))
  }
  
  return csvRows.join('\n')
}

// Generate datasets
const trainingData = generateTrainingData()
const testData = generateTestData()

// Save to files
fs.writeFileSync('sample-data/training-data.csv', arrayToCSV(trainingData))
fs.writeFileSync('sample-data/test-data.csv', arrayToCSV(testData))

console.log(`Generated ${trainingData.length} training records`)
console.log(`Generated ${testData.length} test records`)
console.log('Files saved to sample-data/ directory')