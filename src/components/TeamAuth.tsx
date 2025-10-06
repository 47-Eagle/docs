import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useAuth, GoogleAuthLogin } from './GoogleAuth';

export default function TeamAuth({ children }: { children?: React.ReactNode }) {
  return (
    <BrowserOnly>
      {() => {
        const { isAuthenticated, isLoading, user } = useAuth();

        if (isLoading) {
          return (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--ifm-background-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: '4px solid rgba(246, 213, 92, 0.2)',
                  borderTop: '4px solid #f6d55c',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 1rem'
                }}></div>
                <p style={{ color: 'var(--ifm-color-emphasis-700)' }}>Loading authentication...</p>
              </div>
            </div>
          );
        }

        if (!isAuthenticated) {
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
                maxWidth: '440px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                border: '1px solid rgba(246, 213, 92, 0.1)'
              }}>
                
                {/* Close button */}
                <button
                  onClick={() => window.history.back()}
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
                    transition: 'opacity 0.2s',
                    lineHeight: 1
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = '1'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = '0.6'}
                  title="Go back"
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
                    Team Access Portal
                  </p>
                  <p style={{ 
                    color: 'var(--ifm-color-emphasis-600)', 
                    marginBottom: 0, 
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}>
                    Sign in with your @47eagle.com Google account to access our documentation
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <GoogleAuthLogin />
                </div>

                <div style={{ 
                  marginBottom: '1.5rem',
                  padding: '0.875rem 1rem',
                  background: 'rgba(246, 213, 92, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(246, 213, 92, 0.15)',
                  textAlign: 'center'
                }}>
                  <p style={{ 
                    margin: 0,
                    fontSize: '0.8125rem',
                    color: 'var(--ifm-color-emphasis-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>🔒</span>
                    <span>Secure access restricted to @47eagle.com domain</span>
                  </p>
                </div>

                <div style={{
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(246, 213, 92, 0.1)',
                  textAlign: 'center'
                }}>
                  <p style={{ 
                    margin: 0,
                    fontSize: '0.8125rem',
                    color: 'var(--ifm-color-emphasis-600)'
                  }}>
                    Need help? Contact your system administrator
                  </p>
                </div>
              </div>
            </div>
          );
        }

        if (isAuthenticated && user) {
          return (
            <>
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
                  <span style={{ fontSize: '1.5rem' }}>✓</span>
                  <div>
                    <div style={{ fontWeight: 600, color: '#10b981' }}>Authenticated</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-700)' }}>
                      {user.name} ({user.email})
                    </div>
                  </div>
                </div>
              </div>
              {children}
            </>
          );
        }

        return null;
      }}
    </BrowserOnly>
  );
}

