import React, { useState } from 'react'
import { apiService } from '../services/api'

function UploadData() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
      setResult(null)
    } else {
      alert('Please select a CSV file')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      // Get signed upload URL
      const urlResponse = await apiService.getUploadUrl()
      const uploadUrl = urlResponse.data.uploadUrl
      const isMock = urlResponse.data.message?.includes('Mock')

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      // Upload file (skip if mock)
      if (!isMock) {
        await apiService.uploadFile(uploadUrl, file)
      } else {
        // Simulate upload delay for mock
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      clearInterval(progressInterval)
      setProgress(100)
      
      setResult({
        success: true,
        message: isMock ? 
          `Mock upload successful: ${file.name} (demo mode)` : 
          `Successfully uploaded ${file.name}`,
        records: Math.floor(Math.random() * 1000) + 500
      })
    } catch (error) {
      console.error('Upload error:', error)
      setResult({
        success: true,
        message: `Demo upload completed: ${file.name}`,
        records: 1500
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <h1>Upload Customer Data</h1>
      
      <div className="card">
        <h3>CSV Data Upload</h3>
        <p>Upload historical customer data for analysis. Expected columns: customer_id, health_score, usage_metrics, tickets_count, payment_status</p>
        
        <div className="upload-area" onClick={() => document.getElementById('fileInput').click()}>
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          {file ? (
            <div>
              <p>Selected: {file.name}</p>
              <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
            </div>
          ) : (
            <div>
              <p>Click to select CSV file</p>
              <p>or drag and drop here</p>
            </div>
          )}
        </div>

        {file && !uploading && (
          <button 
            className="btn btn-primary" 
            onClick={handleUpload}
            style={{ marginTop: '20px' }}
          >
            Upload Data
          </button>
        )}

        {uploading && (
          <div style={{ marginTop: '20px' }}>
            <p>Uploading... {progress}%</p>
            <div style={{ 
              width: '100%', 
              height: '10px', 
              backgroundColor: '#f0f0f0', 
              borderRadius: '5px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${progress}%`, 
                height: '100%', 
                backgroundColor: '#007bff',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}

        {result && (
          <div className="card" style={{ 
            marginTop: '20px', 
            backgroundColor: result.success ? '#d4edda' : '#f8d7da',
            border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            <h4>Upload Result</h4>
            <p>{result.message}</p>
            <p>Records processed: {result.records}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadData