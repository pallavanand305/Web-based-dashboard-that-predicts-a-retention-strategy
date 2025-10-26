import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import UploadData from './pages/UploadData'

function App() {
  return (
    <Router>
      <div className="container">
        <nav style={{ marginBottom: '20px', padding: '10px 0', borderBottom: '1px solid #eee' }}>
          <Link to="/" style={{ marginRight: '20px', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/upload" style={{ textDecoration: 'none' }}>Upload Data</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/upload" element={<UploadData />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App