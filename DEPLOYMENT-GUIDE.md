# 🚀 Deployment Guide

## 🔧 Prerequisites

### AWS Credentials Setup
1. **Install AWS CLI**: `npm install -g @aws-cli/cli`
2. **Configure credentials**:
   ```bash
   aws configure
   # Enter: Access Key ID, Secret Access Key, Region (us-east-1), Output format (json)
   ```
3. **Or set environment variables**:
   ```bash
   export AWS_ACCESS_KEY_ID=your_access_key
   export AWS_SECRET_ACCESS_KEY=your_secret_key
   export AWS_DEFAULT_REGION=us-east-1
   ```

## 🧪 Local Testing

### Test Lambda Functions Locally
```bash
cd backend
npm install
npm run test
```

### Run Local Server
```bash
cd backend
npm run local
# Server runs on http://localhost:3000
```

### Test API Endpoints Locally
```bash
# Health scores
curl http://localhost:3000/dev/scores/latest

# Customer score
curl http://localhost:3000/dev/customers/C001/score

# Aggregated customers
curl http://localhost:3000/dev/customers?agg=true&limit=5
```

## 🚀 AWS Deployment

### Deploy Backend
```bash
cd backend
npm install
npm run deploy
```

### Expected Output
```
Service Information
service: retention-dashboard-api
stage: dev
region: us-east-1
stack: retention-dashboard-api-dev
resources: 8
api keys: None
endpoints:
  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/scores/latest
  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/customers/{id}/score
  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/customers
  POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/ingest/upload-url
functions:
  getLatestScores: retention-dashboard-api-dev-getLatestScores
  getCustomerScore: retention-dashboard-api-dev-getCustomerScore
  getAggregatedCustomers: retention-dashboard-api-dev-getAggregatedCustomers
  getUploadUrl: retention-dashboard-api-dev-getUploadUrl
  processData: retention-dashboard-api-dev-processData
```

## 🎯 Frontend Deployment

### Update API URL
```bash
# Copy API Gateway URL from deployment output
echo "VITE_API_URL=https://your-api-gateway-url.amazonaws.com/dev" > .env
```

### Build and Deploy Frontend
```bash
npm install
npm run build

# Deploy to S3 (replace with your bucket)
aws s3 sync dist/ s3://your-bucket-name --delete
```

## ✅ Verification

### Test Deployed API
```bash
# Replace with your actual API Gateway URL
curl https://your-api-gateway-url.amazonaws.com/dev/scores/latest
```

### Test Frontend
1. Open deployed website URL
2. Upload sample CSV from `sample-data/customer-data.csv`
3. View dashboard with charts and top 5 customers
4. Test retention email creation

## 🔍 Troubleshooting

### Common Issues
1. **AWS Credentials**: Ensure AWS CLI is configured or environment variables are set
2. **Permissions**: Ensure IAM user has Lambda, DynamoDB, S3, SNS permissions
3. **Region**: Ensure consistent region (us-east-1) across all services
4. **Dependencies**: Run `npm install` in both root and backend directories

### Debug Commands
```bash
# Check AWS credentials
aws sts get-caller-identity

# Check serverless configuration
cd backend && serverless print

# View CloudFormation stack
aws cloudformation describe-stacks --stack-name retention-dashboard-api-dev
```