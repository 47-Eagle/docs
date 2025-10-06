import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Valid access codes (in production, these should be managed server-side)
const VALID_CODES = [
  'EAGLE2025',
  'INVESTOR47',
  'DEFI2025'
];

export default function InvestorAuth() {
  return (
    <BrowserOnly>
      {() => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [showPopup, setShowPopup] = useState(true);
        const [authMethod, setAuthMethod] = useState<'email' | 'code'>('email');
        const [email, setEmail] = useState('');
        const [accessCode, setAccessCode] = useState('');
        const [error, setError] = useState('');
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
          // Check for existing session
          const savedAuth = sessionStorage.getItem('investor-auth');
          const authExpiry = sessionStorage.getItem('investor-auth-expiry');
          
          if (savedAuth && authExpiry) {
            const expiryTime = parseInt(authExpiry);
            if (Date.now() < expiryTime) {
              setIsAuthenticated(true);
              setShowPopup(false);
            } else {
              sessionStorage.removeItem('investor-auth');
              sessionStorage.removeItem('investor-auth-expiry');
            }
          }
          setIsLoading(false);
        }, []);

        const handleEmailSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          setError('');

          if (!email.endsWith('@47eagle.com')) {
            setError('Only @47eagle.com email addresses are authorized');
            return;
          }

          // Store auth for 8 hours
          const expiryTime = Date.now() + (8 * 60 * 60 * 1000);
          sessionStorage.setItem('investor-auth', JSON.stringify({ email, method: 'email' }));
          sessionStorage.setItem('investor-auth-expiry', expiryTime.toString());
          
          setIsAuthenticated(true);
          setShowPopup(false);
        };

        const handleCodeSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          setError('');

          if (!VALID_CODES.includes(accessCode.toUpperCase())) {
            setError('Invalid access code');
            return;
          }

          // Store auth for 8 hours
          const expiryTime = Date.now() + (8 * 60 * 60 * 1000);
          sessionStorage.setItem('investor-auth', JSON.stringify({ code: accessCode, method: 'code' }));
          sessionStorage.setItem('investor-auth-expiry', expiryTime.toString());
          
          setIsAuthenticated(true);
          setShowPopup(false);
        };

        if (isLoading) {
          return (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'rgba(246, 213, 92, 0.1)',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <p>Loading...</p>
            </div>
          );
        }

        if (!isAuthenticated && showPopup) {
          return (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '1rem'
            }}>
              <div style={{
                background: 'var(--ifm-background-color)',
                padding: '3rem 2.5rem',
                borderRadius: '16px',
                maxWidth: '460px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                border: '1px solid rgba(246, 213, 92, 0.1)'
              }}>
                <button
                  onClick={() => setShowPopup(false)}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'var(--ifm-color-emphasis-500)',
                    padding: '0.25rem 0.5rem',
                    opacity: 0.6,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                >
                  ×
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 1.5rem',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img 
                      src="https://tomato-abundant-urial-204.mypinata.cloud/ipfs/bafybeigzyatm2pgrkqbnskyvflnagtqli6rgh7wv7t2znaywkm2pixmkxy"
                      alt="47 Eagle Finance"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h1 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--ifm-color-emphasis-900)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em'
                  }}>
                    47 Eagle Finance
                  </h1>
                  <p style={{ 
                    color: 'var(--ifm-color-emphasis-700)', 
                    marginBottom: '0.75rem', 
                    fontSize: '1rem',
                    fontWeight: 600
                  }}>
                    Investor Relations Portal
                  </p>
                  <p style={{ 
                    color: 'var(--ifm-color-emphasis-600)', 
                    marginBottom: 0, 
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}>
                    Exclusive access for authorized investors and stakeholders
                  </p>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  marginBottom: '1.5rem',
                  background: 'rgba(246, 213, 92, 0.1)',
                  padding: '0.25rem',
                  borderRadius: '8px'
                }}>
                  <button
                    onClick={() => setAuthMethod('email')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      border: 'none',
                      borderRadius: '6px',
                      background: authMethod === 'email' ? '#f6d55c' : 'transparent',
                      color: authMethod === 'email' ? '#1a1a1a' : 'var(--ifm-color-emphasis-700)',
                      fontWeight: authMethod === 'email' ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => setAuthMethod('code')}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      border: 'none',
                      borderRadius: '6px',
                      background: authMethod === 'code' ? '#f6d55c' : 'transparent',
                      color: authMethod === 'code' ? '#1a1a1a' : 'var(--ifm-color-emphasis-700)',
                      fontWeight: authMethod === 'code' ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Access Code
                  </button>
                </div>

                {authMethod === 'email' ? (
                  <form onSubmit={handleEmailSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontWeight: 500,
                        color: 'var(--ifm-color-emphasis-800)'
                      }}>
                        Authorized Email (@47eagle.com)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="investor@47eagle.com"
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(246, 213, 92, 0.3)',
                          background: 'var(--ifm-background-surface-color)',
                          color: 'var(--ifm-color-emphasis-900)',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    {error && (
                      <div style={{
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        color: '#ef4444',
                        fontSize: '0.875rem'
                      }}>
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#f6d55c',
                        color: '#1a1a1a',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      Access Investor Portal
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleCodeSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontWeight: 500,
                        color: 'var(--ifm-color-emphasis-800)'
                      }}>
                        Access Code
                      </label>
                      <input
                        type="text"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        placeholder="Enter your access code"
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(246, 213, 92, 0.3)',
                          background: 'var(--ifm-background-surface-color)',
                          color: 'var(--ifm-color-emphasis-900)',
                          fontSize: '1rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}
                      />
                    </div>
                    {error && (
                      <div style={{
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        color: '#ef4444',
                        fontSize: '0.875rem'
                      }}>
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#f6d55c',
                        color: '#1a1a1a',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      Access Investor Portal
                    </button>
                  </form>
                )}

                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(246, 213, 92, 0.1)',
                  textAlign: 'center'
                }}>
                  <p style={{ 
                    margin: 0,
                    fontSize: '0.8rem',
                    color: 'var(--ifm-color-emphasis-600)'
                  }}>
                    Need access? Contact <strong>investors@47eagle.com</strong>
                  </p>
                </div>
              </div>
            </div>
          );
        }

        if (isAuthenticated) {
          const savedAuth = sessionStorage.getItem('investor-auth');
          const authData = savedAuth ? JSON.parse(savedAuth) : {};
          
          return (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(246, 213, 92, 0.1))',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>💎</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#10b981' }}>Investor Access Granted</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-700)' }}>
                    {authData.method === 'email' ? authData.email : 'Authorized via access code'}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return null;
      }}
    </BrowserOnly>
  );
}

