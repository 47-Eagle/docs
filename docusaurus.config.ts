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

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/47-Eagle/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [],

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
        src: 'img/eagle-logo.svg',
        style: {
          height: '32px',
        },
      },
      items: [
        // Clean left navigation
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
          className: 'navbar-link-elegant',
        },
        {
          to: '/users/getting-started',
          position: 'left',
          label: 'Get Started',
          className: 'navbar-link-elegant',
        },
        {
          to: '/dev/architecture',
          position: 'left',
          label: 'Architecture',
          className: 'navbar-link-elegant',
        },
        
        // Right side - ultra clean
        {
          href: 'https://github.com/47-Eagle',
          position: 'right',
          className: 'navbar-github-elegant',
          'aria-label': 'GitHub Organization',
          html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        },
        {
          type: 'custom-teamLogin',
          position: 'right',
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
              to: '/users/getting-started',
            },
            {
              label: 'Understanding Vaults',
              to: '/users/understanding-vaults',
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
              to: '/legal/terms',
            },
            {
              label: 'Privacy Policy',
              to: '/legal/privacy',
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
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;