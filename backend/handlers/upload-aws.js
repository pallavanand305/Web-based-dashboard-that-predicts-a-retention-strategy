import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({})

export const getSignedUrl = async (event) => {
  try {
    const bucketName = process.env.DATA_BUCKET
    const key = `uploads/${Date.now()}-customer-data.csv`
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: 'text/csv'
    })
    
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uploadUrl,
        key
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