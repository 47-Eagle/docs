import React, { useState, useEffect, createContext, useContext } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Types
interface User {
  email: string;
  name: string;
  picture?: string;
  domain?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

// Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Decode JWT token
const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkExistingAuth = () => {
      try {
        const savedUser = sessionStorage.getItem('eagle-auth-user');
        const authExpiry = sessionStorage.getItem('eagle-auth-expiry');
        
        if (savedUser && authExpiry) {
          const expiryTime = parseInt(authExpiry);
          if (Date.now() < expiryTime) {
            setUser(JSON.parse(savedUser));
          } else {
            // Expired, clear storage
            sessionStorage.removeItem('eagle-auth-user');
            sessionStorage.removeItem('eagle-auth-expiry');
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Store session for 8 hours
    const expiryTime = Date.now() + (8 * 60 * 60 * 1000);
    sessionStorage.setItem('eagle-auth-user', JSON.stringify(userData));
    sessionStorage.setItem('eagle-auth-expiry', expiryTime.toString());
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('eagle-auth-user');
    sessionStorage.removeItem('eagle-auth-expiry');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Google Login Component
export function GoogleAuthLogin() {
  const { siteConfig } = useDocusaurusContext();
  const { login } = useAuth();
  
  const clientId = siteConfig.customFields?.googleClientId as string;
  const allowedDomain = siteConfig.customFields?.allowedDomain as string || '47eagle.com';
  
  // Production logging removed for security

  const handleSuccess = (response: any) => {
    try {
      const payload = decodeJWT(response.credential);
      
      if (!payload) {
        throw new Error('Failed to decode authentication token');
      }

      // Check domain restriction
      if (payload.hd !== allowedDomain) {
        alert(`Access denied: Only @${allowedDomain} email addresses are allowed`);
        return;
      }

      // Create user object
      const userData: User = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        domain: payload.hd
      };

      login(userData);
    } catch (error) {
      console.error('Login processing error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleError = () => {
    console.error('Google login failed');
    alert('Google login failed. Please check your connection and try again.');
  };

  if (!clientId) {
    return (
      <div className="auth-error">
        <h3>⚠️ Configuration Error</h3>
        <p>Google OAuth client ID is not configured.</p>
        <p>Please check your environment variables.</p>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="google-login-container">
        <div className="login-header">
          <img 
            src="/img/eagle-logo.svg" 
            alt="47 Eagle Finance" 
            className="login-logo"
          />
          <h1>47 Eagle Finance</h1>
          <h2>Team Access Portal</h2>
          <p>Sign in with your @47eagle.com Google account to access our documentation</p>
        </div>
        
        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="280"
          />
        </div>
        
        <div className="login-footer">
          <p className="login-notice">
            🔒 Secure access restricted to @47eagle.com domain
          </p>
          <p className="login-help">
            Need help? Contact your system administrator
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

// User Profile Component
export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="user-profile">
      <div className="user-info">
        {user.picture && (
          <img 
            src={user.picture} 
            alt={user.name} 
            className="user-avatar"
          />
        )}
        <div className="user-details">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </div>
      </div>
      <button onClick={logout} className="logout-btn">
        Sign Out
      </button>
    </div>
  );
}

// Protected Content Wrapper
export function ProtectedContent({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <BrowserOnly>
      {() => {
        const { isAuthenticated, isLoading } = useAuth();
        
        if (isLoading) {
          return (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Checking authentication...</p>
            </div>
          );
        }
        
        if (!isAuthenticated) {
          return fallback || (
            <div className="protected-content-notice">
              <h3>🔒 Authentication Required</h3>
              <p>This section contains sensitive information and requires authentication.</p>
              <p>Please sign in with your @47eagle.com Google account to continue.</p>
            </div>
          );
        }
        
        return <>{children}</>;
      }}
    </BrowserOnly>
  );
}
