import React, { useState } from 'react';
import './PartnerForm.css';

const PartnerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    partnershipType: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const response = await fetch('http://localhost:5000/api/partners/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setStatus({ type: 'success', message: 'Thank you! Your request has been sent.' });
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Failed to send message.' });
    }
  };

  if (status?.type === 'success') {
    return <div className="form-status success">{status.message}</div>
  }

  return (
    <form onSubmit={handleSubmit} className="partner-form">
      <h2>Partner with us</h2>
      <div className="form-row">
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      </div>
      <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email ID" onChange={handleChange} required />
      <select name="partnershipType" onChange={handleChange} required>
        <option value="">Select Partnership Type</option>
        <option value="Real Estate">Real Estate Partnership</option>
        <option value="Accommodation">Accommodation Partnership</option>
        <option value="Vendor">Vendor Partnership</option>
      </select>
      <textarea name="message" placeholder="Type your message here" onChange={handleChange}></textarea>
      <button type="submit" className="submit-btn">Let's Get Started</button>
      {status?.type === 'error' && <div className="form-status error">{status.message}</div>}
    </form>
  );
};

export default PartnerForm;