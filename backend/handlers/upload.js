export const getSignedUrl = async (event) => {
  try {
    const key = `uploads/${Date.now()}-customer-data.csv`
    
    // Always return mock response for demo
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uploadUrl: `https://mock-s3-bucket.amazonaws.com/retention-dashboard/${key}`,
        key,
        message: 'Mock upload URL generated (demo mode)'
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