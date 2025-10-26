# Deployment Guide

## Prerequisites
- AWS CLI configured with appropriate permissions
- Node.js 18+ installed
- Serverless Framework installed globally: `npm install -g serverless`

## Backend Deployment

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Deploy to AWS:
```bash
npm run deploy
```

3. Note the API Gateway URL from the deployment output

## Frontend Deployment

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with API URL:
```bash
VITE_API_URL=https://your-api-gateway-url.amazonaws.com/dev
```

3. Build for production:
```bash
npm run build
```

4. Deploy to S3 + CloudFront:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Testing

1. Start local development:
```bash
npm run dev
```

2. Test with sample data in `sample-data/customer-data.csv`

## API Endpoints

- GET `/scores/latest?segment=&region=&limit=`
- GET `/customers/{id}/score`
- GET `/customers?agg=true&limit=`
- POST `/ingest/upload-url`