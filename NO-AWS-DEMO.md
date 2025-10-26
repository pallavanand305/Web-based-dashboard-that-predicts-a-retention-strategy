# 🎯 No-AWS Demo Instructions

## ✅ Working Commands (No AWS Required)

### 1. Mock Deployment
```bash
cd backend
npm install
npm run deploy
# ✅ Shows successful deployment simulation
```

### 2. Local API Server
```bash
cd backend
npm run local
# ✅ Starts API server on http://localhost:3000
```

### 3. Function Testing
```bash
cd backend
npm run test
# ✅ Tests all Lambda functions locally
```

### 4. Frontend Demo
```bash
npm install
npm run dev
# ✅ Runs dashboard on http://localhost:5173
```

## 🚫 Commands That Need AWS Credentials

```bash
# DON'T USE - Requires AWS setup
npm run deploy-aws
```

## 🎬 Complete Demo Workflow

### Step 1: Backend Mock Deploy
```bash
cd backend
npm install
npm run deploy
# Shows: "MOCK DEPLOYMENT SUCCESSFUL!"
```

### Step 2: Start Local API (Optional)
```bash
cd backend
npm run local
# API available at http://localhost:3000
```

### Step 3: Frontend Demo
```bash
# In new terminal
npm install
npm run dev
# Dashboard at http://localhost:5173
```

### Step 4: Test Features
1. Upload `sample-data/customer-data.csv`
2. View health score charts
3. See top 5 risky customers
4. Create retention offers

## 📊 What Works Without AWS
- ✅ Frontend dashboard with charts
- ✅ CSV upload simulation
- ✅ Customer risk predictions
- ✅ Email retention offers
- ✅ ML model accuracy display
- ✅ Local API testing
- ✅ Mock deployment output

**Perfect for demo, evaluation, and development!**