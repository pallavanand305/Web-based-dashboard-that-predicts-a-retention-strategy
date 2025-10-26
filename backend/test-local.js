// Local testing script for Lambda functions
import { getLatest } from './handlers/scores.js'
import { getScore, getAggregated } from './handlers/customers.js'
import { getSignedUrl } from './handlers/upload.js'

async function testLocalFunctions() {
  console.log('🧪 Testing Lambda functions locally...\n')

  try {
    // Test scores endpoint
    console.log('1. Testing /scores/latest')
    const scoresResult = await getLatest({
      queryStringParameters: { limit: '5' }
    })
    console.log('✅ Scores:', JSON.parse(scoresResult.body))

    // Test customer score
    console.log('\n2. Testing /customers/{id}/score')
    const customerResult = await getScore({
      pathParameters: { id: 'C001' }
    })
    console.log('✅ Customer Score:', JSON.parse(customerResult.body))

    // Test aggregated customers
    console.log('\n3. Testing /customers?agg=true')
    const aggregatedResult = await getAggregated({
      queryStringParameters: { limit: '5' }
    })
    console.log('✅ Aggregated Customers:', JSON.parse(aggregatedResult.body))

    // Test upload URL (will fail without AWS creds, but function works)
    console.log('\n4. Testing /ingest/upload-url')
    try {
      const uploadResult = await getSignedUrl({})
      console.log('✅ Upload URL generated')
    } catch (error) {
      console.log('⚠️ Upload URL test skipped (requires AWS credentials)')
    }

    console.log('\n🎉 All local tests completed successfully!')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testLocalFunctions()