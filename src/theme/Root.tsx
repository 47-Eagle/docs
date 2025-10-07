import React from 'react';
import { AuthProvider } from '@site/src/components/GoogleAuth';
import KonamiCode from '@site/src/components/KonamiCode';
import '@site/src/components/GoogleAuth/styles.css';
import './loading-screen.css';

export default function Root({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsTransitioning(true);
          setTimeout(() => {
            setLoading(false);
          }, 800); // Fade out duration
          return 100;
        }
        // Non-linear progress for more natural feel
        const increment = Math.random() * 15 + 5; // Random between 5-20
        return Math.min(prev + increment, 100);
      });
    }, 100); // Update every 100ms

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className={`eagle-loading-screen ${isTransitioning ? 'fade-out' : ''}`}>
        <div className="eagle-loading-content">
          {/* Eagle Logo Animation */}
          <div className="eagle-logo-container">
            <svg
              className="eagle-logo"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 20 L30 40 L40 40 L40 60 L30 60 L50 80 L70 60 L60 60 L60 40 L70 40 Z"
                fill="currentColor"
                className="eagle-path"
              />
            </svg>
          </div>

          {/* Progress Percentage */}
          <div className="eagle-progress-container">
            <div className="eagle-progress-percentage">
              {Math.floor(progress)}%
            </div>
            <div className="eagle-progress-label">
              Initializing Eagle Finance
            </div>
          </div>

          {/* Progress Bar */}
          <div className="eagle-progress-bar-container">
            <div
              className="eagle-progress-bar"
              style={{ width: `${progress}%` }}
            >
              <div className="eagle-progress-glow" />
            </div>
          </div>

          {/* Animated Dots */}
          <div className="eagle-loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <KonamiCode />
      {children}
    </AuthProvider>
  );
}
