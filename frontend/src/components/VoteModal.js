import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

export default function VoteModal({ candidate, onClose }) {
  const [form, setForm] = useState({
    fullName: '',
    amountPaid: '',
    transactionRef: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const votes = form.amountPaid ? Math.floor(parseFloat(form.amountPaid) / 200) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.fullName.trim()) return setError('Please enter your full name.');
    const amount = parseFloat(form.amountPaid);
    if (!amount || amount < 200) return setError('Minimum amount is ₦200.');
    if (!form.transactionRef.trim()) return setError('Please enter your transaction reference.');

    setLoading(true);
    try {
      await axios.post(`${API}/api/submit-vote`, {
        fullName: form.fullName,
        candidateId: candidate._id,
        candidateName: candidate.name,
        category: candidate.category,
        amountPaid: amount,
        transactionRef: form.transactionRef,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
          <h2 style={{ color: '#C9A84C', marginBottom: 12 }}>Vote Submitted!</h2>
          <p style={{ color: '#9A9488', marginBottom: 8 }}>Your vote is awaiting admin approval.</p>
          <p style={{ color: '#F0EDE4', marginBottom: 24 }}>
            <strong>{votes} vote{votes !== 1 ? 's' : ''}</strong> for <strong>{candidate.name}</strong> will be added once verified.
          </p>
          <button className="btn btn-gold" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ color: '#C9A84C', fontSize: 22 }}>Cast Your Vote</h2>
          <button onClick={onClose} style={{ background: 'none', color: '#9A9488', fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>

        {/* Payment Instructions */}
        <div style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: 10,
          padding: 16,
          marginBottom: 24,
        }}>
          <p style={{ fontWeight: 700, color: '#C9A84C', marginBottom: 10, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            💳 Payment Instructions
          </p>
          <div style={{ display: 'grid', gap: 6, fontSize: 14, color: '#F0EDE4' }}>
            <div><span style={{ color: '#9A9488' }}>Bank:</span> <strong>OPay</strong></div>
            <div><span style={{ color: '#9A9488' }}>Account Name:</span> <strong>[ACCOUNT NAME]</strong></div>
            <div><span style={{ color: '#9A9488' }}>Account Number:</span> <strong>[ACCOUNT NUMBER]</strong></div>
            <div style={{ marginTop: 6, color: '#C9A84C', fontWeight: 600 }}>₦200 = 1 vote</div>
          </div>
        </div>

        {/* Vote Preview */}
        <div style={{
          background: '#1F1F1F',
          borderRadius: 10,
          padding: '12px 16px',
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 13, color: '#9A9488' }}>Voting for</div>
            <div style={{ fontWeight: 700, color: '#F0EDE4' }}>{candidate.name}</div>
            <div style={{ fontSize: 12, color: '#9A9488' }}>{candidate.category}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: '#9A9488' }}>Votes</div>
            <div style={{ fontWeight: 900, fontSize: 28, color: '#C9A84C', lineHeight: 1 }}>{votes}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>Candidate</label>
            <input type="text" value={candidate.name} readOnly />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input type="text" value={candidate.category} readOnly />
          </div>

          <div className="form-group">
            <label>Amount Paid (₦)</label>
            <input
              type="number"
              placeholder="e.g. 1000 = 5 votes"
              min="200"
              step="200"
              value={form.amountPaid}
              onChange={e => setForm(f => ({ ...f, amountPaid: e.target.value }))}
            />
            {votes > 0 && (
              <div style={{ marginTop: 6, fontSize: 13, color: '#C9A84C' }}>
                ✓ This will give <strong>{votes} vote{votes !== 1 ? 's' : ''}</strong>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Transaction Reference</label>
            <input
              type="text"
              placeholder="OPay transaction ID"
              value={form.transactionRef}
              onChange={e => setForm(f => ({ ...f, transactionRef: e.target.value }))}
            />
          </div>

          {error && (
            <div style={{ color: '#E05A5A', background: 'rgba(224,90,90,0.1)', border: '1px solid rgba(224,90,90,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-gold"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 16 }}
          >
            {loading ? 'Submitting...' : 'Submit Vote'}
          </button>
        </form>
      </div>
    </div>
  );
}