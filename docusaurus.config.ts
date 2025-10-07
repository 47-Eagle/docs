import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Load environment variables
require('dotenv').config();

const config: Config = {
  title: '47 Eagle Finance',
  tagline: 'Omnichain DeFi infrastructure powered by LayerZero OVault Standard',
  favicon: 'img/eagle-favicon.ico',

  // Set the production URL of your site here
  url: 'https://docs.47eagle.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: '47-Eagle',
  projectName: 'docs',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  
  // Serve home.html at root instead of index
  trailingSlash: false,
  
  // Enable static assets optimization
  staticDirectories: ['static'],
  
  // Performance: Resource hints and preloading
  headTags: [
    // Preconnect to Google Fonts
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    // DNS prefetch for external resources
    {
      tagName: 'link',
      attributes: {
        rel: 'dns-prefetch',
        href: 'https://fonts.googleapis.com',
      },
    },
    // PWA manifest
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/manifest.json',
      },
    },
    // Theme color for mobile
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#d4af37',
      },
    },
    // Apple touch icon
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/eagle-logo-new.svg',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: false, // Disable default docs plugin
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/navbar-fix.css', './src/css/page-transitions.css', './src/css/custom-buttons.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'users',
        path: 'docs/users',
        routeBasePath: 'user',
        sidebarPath: './sidebars-users.ts',
        editUrl: 'https://github.com/47-Eagle/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'developers',
        path: 'docs/dev',
        routeBasePath: 'dev',
        sidebarPath: './sidebars-dev.ts',
        editUrl: 'https://github.com/47-Eagle/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'investors',
        path: 'docs/investor',
        routeBasePath: 'investor',
        sidebarPath: './sidebars-investor.ts',
        editUrl: 'https://github.com/47-Eagle/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'partners',
        path: 'docs/partner',
        routeBasePath: 'partner',
        sidebarPath: './sidebars-partner.ts',
        editUrl: 'https://github.com/47-Eagle/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'team',
        path: 'docs/team',
        routeBasePath: 'team',
        sidebarPath: './sidebars-team.ts',
        editUrl: 'https://github.com/47-Eagle/docs/tree/main/',
      },
    ],
  ],

  // Custom fields for Google OAuth
  customFields: {
    googleClientId: process.env.GOOGLE_CLIENT_ID || '210963243141-bkljoqjrhcm6spjgmhprhlmro59eiacr.apps.googleusercontent.com',
    allowedDomain: process.env.ALLOWED_DOMAIN || '47eagle.com',
  },

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    image: 'img/eagle-social-card.jpg',
    colorMode: {
    defaultMode: 'light',
    disableSwitch: false,
    respectPrefersColorScheme: false,
  },
    navbar: {
      title: '',
      logo: {
        alt: '47 Eagle Finance',
        src: 'img/eagle-logo-new.svg',
        href: '/user',
        target: '_self',
        style: {
          height: '32px',
          marginRight: '0.75rem',
          filter: 'brightness(0) invert(1)',
        },
      },
      items: [
        // Audience-based navigation sections
        {
          to: '/user',
          position: 'left',
          label: 'Users',
          className: 'navbar-section-link',
        },
        {
          to: '/dev',
          position: 'left',
          label: 'Developers',
          className: 'navbar-section-link',
        },
        {
          to: '/investor',
          position: 'left', 
          label: 'Investors',
          className: 'navbar-section-link',
        },
        {
          to: '/partner',
          position: 'left',
          label: 'Partners', 
          className: 'navbar-section-link',
        },
        
        // Right side - GitHub (search is added automatically by plugin)
        {
          href: 'https://github.com/47-Eagle',
          position: 'right',
          className: 'navbar-github-clean',
          'aria-label': 'GitHub Organization',
          html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/user/getting-started',
            },
            {
              label: 'Understanding Vaults',
              to: '/user/understanding-vaults',
            },
            {
              label: 'Architecture',
              to: '/dev/architecture',
            },
          ],
        },
        {
          title: 'Smart Contracts',
          items: [
            {
              label: 'Eagle OVault',
              to: '/contracts/eagle-ovault',
            },
            {
              label: 'Charm Alpha Vault Strategy',
              to: '/contracts/charm-alpha-vault-strategy',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms & Conditions',
              to: '/legal/terms-of-service',
            },
            {
              label: 'Privacy Policy',
              to: '/legal/privacy-policy',
            },
            {
              label: 'Risk Disclosures',
              to: '/legal/risk-disclosures',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Team Portal',
              to: '/team',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/47-Eagle',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/TeamEagle47',
            },
            {
              label: 'Website',
              href: 'https://47eagle.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 47 Eagle Finance. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity', 'javascript', 'typescript', 'bash'],
    },
    mermaid: {
      theme: {light: 'base', dark: 'dark'},
      options: {
        theme: 'base',
        themeVariables: {
          // Primary Golden Theme - High Contrast
          primaryColor: '#fbbf24',
          primaryTextColor: '#000000',
          primaryBorderColor: '#d97706',
          
          // Secondary Colors
          secondaryColor: '#fef3cd',
          secondaryTextColor: '#000000',
          secondaryBorderColor: '#d97706',
          
          // Tertiary Colors
          tertiaryColor: '#fff5e1',
          tertiaryTextColor: '#000000',
          tertiaryBorderColor: '#d97706',
          
          // Background & Lines - Better Contrast
          background: '#ffffff',
          mainBkg: '#fbbf24',
          secondBkg: '#fef3cd',
          tertiaryBkg: '#fff5e1',
          lineColor: '#d97706',
          
          // Node Styling - Stronger borders
          nodeBorder: '#d97706',
          clusterBkg: '#fffbf0',
          clusterBorder: '#d97706',
          
          // Text & Font - Black text for readability
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          fontSize: '15px',
          
          // Edge/Arrow Colors - Darker
          edgeLabelBackground: '#ffffff',
          
          // Note Styling - Better contrast
          noteBkgColor: '#fef3cd',
          noteTextColor: '#000000',
          noteBorderColor: '#d97706',
          
          // Active/Hover States
          activeTaskBkgColor: '#fbbf24',
          activeTaskBorderColor: '#d97706',
          
          // Grid - Lighter for background
          gridColor: '#fef3cd',
          
          // Sequence Diagram - High contrast
          actorBkg: '#fbbf24',
          actorBorder: '#d97706',
          actorTextColor: '#000000',
          actorLineColor: '#d97706',
          signalColor: '#000000',
          signalTextColor: '#000000',
          labelBoxBkgColor: '#fbbf24',
          labelBoxBorderColor: '#d97706',
          labelTextColor: '#000000',
          loopTextColor: '#000000',
          activationBkgColor: '#d97706',
          activationBorderColor: '#92400e',
          sequenceNumberColor: '#ffffff',
        },
        flowchart: {
          curve: 'basis',
          padding: 20,
          nodeSpacing: 100,
          rankSpacing: 80,
          diagramPadding: 20,
          htmlLabels: true,
        },
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 30,
          actorMargin: 80,
          width: 180,
          height: 65,
          boxMargin: 15,
          boxTextMargin: 10,
          noteMargin: 15,
          messageMargin: 50,
          mirrorActors: true,
          useMaxWidth: true,
        },
        gantt: {
          titleTopMargin: 30,
          barHeight: 30,
          barGap: 8,
          topPadding: 60,
          leftPadding: 100,
          gridLineStartPadding: 40,
          fontSize: 14,
          sectionFontSize: 16,
          numberSectionStyles: 4,
          useMaxWidth: true,
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;