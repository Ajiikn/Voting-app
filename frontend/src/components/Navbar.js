import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  nav: {
    background: 'rgba(13,13,13,0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(201,168,76,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 24,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #C9A84C, #E8C86A)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  links: { display: 'flex', gap: 8 },
  link: (active) => ({
    padding: '8px 16px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: active ? '#C9A84C' : '#9A9488',
    background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
    transition: 'all 0.2s',
    cursor: 'pointer',
  }),
};

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>🎓 UniVote</Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link(pathname === '/')}>Home</Link>
          <Link to="/results" style={styles.link(pathname === '/results')}>Results</Link>
          <Link to="/admin" style={styles.link(pathname === '/admin')}>Admin</Link>
        </div>
      </div>
    </nav>
  );
}