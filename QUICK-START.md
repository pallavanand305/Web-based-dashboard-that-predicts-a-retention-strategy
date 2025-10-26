# 🚀 Quick Start Guide

## 🎯 Option 1: Local Development (No AWS Required)

### Frontend Only
```bash
# Install and run frontend
npm install
npm run dev
# Visit http://localhost:5173
```

### Backend + Frontend
```bash
# Terminal 1: Start backend
cd backend
npm install
npm run local
# API runs on http://localhost:3000

# Terminal 2: Start frontend
npm install
echo "VITE_API_URL=http://localhost:3000/dev" > .env
npm run dev
# Visit http://localhost:5173
```

### Test Functions
```bash
cd backend
npm run test
# Tests all Lambda functions locally
```

## 🎯 Option 2: Mock Deployment (Demo)

```bash
cd backend
npm run deploy-mock
# Shows deployment simulation
```

## 🎯 Option 3: Real AWS Deployment

### Prerequisites
```bash
# Install AWS CLI
npm install -g @aws-cli/cli

# Configure credentials
aws configure
# Enter: Access Key, Secret Key, Region (us-east-1), Format (json)
```

### Deploy
```bash
cd backend
npm run deploy
# Real AWS deployment
```

## 🧪 Testing Endpoints

### Local API (http://localhost:3000/dev)
```bash
# Health scores
curl http://localhost:3000/dev/scores/latest

# Customer score  
curl http://localhost:3000/dev/customers/C001/score

# Top 5 customers
curl http://localhost:3000/dev/customers?agg=true&limit=5
```

## 📊 Sample Data

Upload `sample-data/customer-data.csv` through the UI to test:
- Dashboard charts
- Top 5 customer predictions
- Retention email creation

## 🎯 Quick Demo

1. **Start**: `npm run dev` (frontend only)
2. **Upload**: Use sample CSV data
3. **View**: Dashboard with charts and predictions
4. **Test**: Create retention offers

**No AWS setup required for basic demo!**