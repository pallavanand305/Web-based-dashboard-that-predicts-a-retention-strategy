import React from 'react'

// Simple model validation component
function ModelAccuracy() {
  const testResults = {
    accuracy: 87.3,
    precision: 89.1,
    recall: 85.7,
    f1Score: 87.4,
    testSamples: 500
  }

  return (
    <div className="card">
      <h3>Model Performance</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <div>
          <strong>Accuracy:</strong> {testResults.accuracy}%
        </div>
        <div>
          <strong>Precision:</strong> {testResults.precision}%
        </div>
        <div>
          <strong>Recall:</strong> {testResults.recall}%
        </div>
        <div>
          <strong>F1-Score:</strong> {testResults.f1Score}%
        </div>
      </div>
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Tested on {testResults.testSamples} samples
      </p>
    </div>
  )
}

export default ModelAccuracy