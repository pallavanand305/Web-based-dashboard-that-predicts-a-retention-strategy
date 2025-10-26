import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { apiService } from '../services/api'
import ModelAccuracy from '../components/ModelAccuracy'
import EmailIntegration from '../components/EmailIntegration'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

function DashboardPage() {
  const [healthScores, setHealthScores] = useState([])
  const [riskCustomers, setRiskCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [scoresRes, customersRes] = await Promise.all([
        apiService.getLatestScores({ limit: 10 }),
        apiService.getAggregatedCustomers({ limit: 5 })
      ])
      
      setHealthScores(scoresRes.data.scores || [])
      setRiskCustomers(customersRes.data.customers || [])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      // Mock data for development
      setHealthScores([
        { segment: 'High Risk', count: 45 },
        { segment: 'Medium Risk', count: 120 },
        { segment: 'Low Risk', count: 235 }
      ])
      setRiskCustomers([
        { id: 'C001', name: 'Customer A', healthScore: 25, riskScore: 85, keyDriver: 'Usage Drop' },
        { id: 'C002', name: 'Customer B', healthScore: 30, riskScore: 80, keyDriver: 'Failed Payments' },
        { id: 'C003', name: 'Customer C', healthScore: 35, riskScore: 75, keyDriver: 'Open Tickets' },
        { id: 'C004', name: 'Customer D', healthScore: 40, riskScore: 70, keyDriver: 'Usage Drop' },
        { id: 'C005', name: 'Customer E', healthScore: 45, riskScore: 65, keyDriver: 'Failed Payments' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const createRetentionOffer = (customer) => {
    setSelectedCustomer(customer)
    setShowEmailModal(true)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Customer Retention Dashboard</h1>
      
      <div className="grid">
        <div className="card">
          <h3>Health Score Distribution</h3>
          <BarChart width={300} height={200} data={healthScores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="segment" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="card">
          <h3>Risk Score Distribution</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={healthScores}
              cx={150}
              cy={100}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              label
            >
              {healthScores.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <ModelAccuracy />
      </div>

      <div className="card">
        <h3>Top 5 Risky Customers</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Health Score</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Risk Score</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Key Driver</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {riskCustomers.map((customer) => (
              <tr key={customer.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '10px' }}>{customer.name}</td>
                <td style={{ padding: '10px' }}>{customer.healthScore}</td>
                <td style={{ padding: '10px' }}>{customer.riskScore}</td>
                <td style={{ padding: '10px' }}>{customer.keyDriver}</td>
                <td style={{ padding: '10px' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => createRetentionOffer(customer)}
                  >
                    Create Offer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEmailModal && selectedCustomer && (
        <EmailIntegration 
          customer={selectedCustomer}
          onClose={() => {
            setShowEmailModal(false)
            setSelectedCustomer(null)
          }}
        />
      )}
    </div>
  )
}

export default DashboardPage