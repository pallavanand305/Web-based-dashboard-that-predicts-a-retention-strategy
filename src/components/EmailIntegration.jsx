import React, { useState } from 'react'

function EmailIntegration({ customer, onClose }) {
  const [emailConfig, setEmailConfig] = useState({
    to: customer.email || `${customer.name.toLowerCase().replace(' ', '.')}@company.com`,
    subject: `Retention Offer - ${customer.name}`,
    template: getEmailTemplate(customer)
  })
  const [sending, setSending] = useState(false)

  function getEmailTemplate(customer) {
    const templates = {
      'Failed Payments': `Hi ${customer.name},\n\nWe noticed some payment issues with your account. We'd like to offer you a 20% discount on your next billing cycle to help resolve this.\n\nPlease contact us to discuss payment options.\n\nBest regards,\nCustomer Success Team`,
      'Open Tickets': `Hi ${customer.name},\n\nWe see you have several open support tickets. We're assigning a dedicated Customer Success Manager to help resolve these issues quickly.\n\nYour CSM will contact you within 24 hours.\n\nBest regards,\nSupport Team`,
      'Usage Drop': `Hi ${customer.name},\n\nWe noticed decreased usage of our platform. We'd love to help you get more value from our services.\n\nWe're offering a complimentary training session and feature demo.\n\nBest regards,\nCustomer Success Team`
    }
    return templates[customer.keyDriver] || templates['Usage Drop']
  }

  const handleSendEmail = async () => {
    setSending(true)
    
    // Mock email sending - in real implementation, call SES API
    setTimeout(() => {
      alert(`Email sent to ${emailConfig.to}`)
      setSending(false)
      onClose()
    }, 2000)
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="card" style={{ width: '500px', maxHeight: '80vh', overflow: 'auto' }}>
        <h3>Send Retention Email</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label>To:</label>
          <input
            type="email"
            value={emailConfig.to}
            onChange={(e) => setEmailConfig({...emailConfig, to: e.target.value})}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Subject:</label>
          <input
            type="text"
            value={emailConfig.subject}
            onChange={(e) => setEmailConfig({...emailConfig, subject: e.target.value})}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Message:</label>
          <textarea
            value={emailConfig.template}
            onChange={(e) => setEmailConfig({...emailConfig, template: e.target.value})}
            rows={8}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="btn" onClick={onClose} disabled={sending}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSendEmail}
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailIntegration