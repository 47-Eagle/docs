import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import { useLocation } from '@docusaurus/router';

export default function Layout(props) {
  const location = useLocation();
  
  // For the homepage, return children directly without Docusaurus wrapper
  if (location.pathname === '/') {
    return <>{props.children}</>;
  }
  
  // For all other pages, use the original Docusaurus layout
  return <OriginalLayout {...props} />;
}
