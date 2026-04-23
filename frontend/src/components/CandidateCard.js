import React from 'react';

const API = process.env.REACT_APP_API_URL || '';

export default function CandidateCard({ candidate, onVote }) {
  const imgSrc = candidate.image
    ? (candidate.image.startsWith('http') ? candidate.image : `${API}${candidate.image}`)
    : null;

  return (
    <div style={{
      background: '#161616',
      border: '1px solid #2A2A2A',
      borderRadius: 16,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.border = '1px solid rgba(201,168,76,0.4)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = '1px solid #2A2A2A';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div style={{
        height: 220,
        background: '#1F1F1F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={candidate.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ fontSize: 64 }}>👤</div>
        )}
        <div style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          background: 'rgba(13,13,13,0.85)',
          backdropFilter: 'blur(6px)',
          borderRadius: 20,
          padding: '4px 12px',
          fontSize: 11,
          fontWeight: 700,
          color: '#C9A84C',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {candidate.category}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 20px 20px' }}>
        <h3 style={{ fontSize: 18, marginBottom: 4, color: '#F0EDE4' }}>{candidate.name}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 13, color: '#9A9488' }}>Current votes</span>
          <span style={{ fontWeight: 700, color: '#C9A84C', fontSize: 16 }}>🗳 {candidate.votes}</span>
        </div>
        <button
          className="btn btn-gold"
          onClick={() => onVote(candidate)}
          style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
        >
          Vote Now
        </button>
      </div>
    </div>
  );
}