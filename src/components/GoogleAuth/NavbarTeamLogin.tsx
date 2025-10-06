import React, { useState } from 'react';
import { useAuth, GoogleAuthLogin, UserProfile } from './index';

export function TeamLoginButton() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (isLoading) {
    return (
      <div className="team-login-loading">
        <div className="mini-spinner"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <UserProfile />;
  }

  return (
    <>
      <button 
        className="team-access-btn" 
        onClick={() => setShowLogin(true)}
      >
        Team Login
      </button>
      
      {showLogin && (
        <div className="team-login-modal">
          <div 
            className="team-login-backdrop" 
            onClick={() => setShowLogin(false)} 
          />
          <div className="team-login-modal-content">
            <button 
              className="modal-close-btn"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>
            <GoogleAuthLogin />
          </div>
        </div>
      )}
    </>
  );
}
