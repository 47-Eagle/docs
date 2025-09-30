import React from 'react';
import { AuthProvider } from '@site/src/components/GoogleAuth';
import '@site/src/components/GoogleAuth/styles.css';

// Root wrapper that provides auth context but doesn't require authentication
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
