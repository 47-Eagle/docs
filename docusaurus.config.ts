import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '47 Eagle Finance',
  tagline: 'Omnichain DeFi infrastructure powered by LayerZero OVault Standard',
  favicon: 'img/eagle-favicon.ico',

  // Set the production URL of your site here
  url: 'https://47-Eagle.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: '47-Eagle',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/47-Eagle/docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [],

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    image: 'img/eagle-social-card.png',
  colorMode: {
    defaultMode: 'dark',
    disableSwitch: false,
    respectPrefersColorScheme: false,
  },
    navbar: {
      title: '47 Eagle Finance',
      logo: {
        alt: 'Eagle Omnichain Vault Logo',
        src: 'img/eagle-logo.svg',
        style: {
          height: '32px',
          width: 'auto',
        },
        srcDark: 'img/eagle-logo.svg', // Same logo for dark mode
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/users/getting-started',
          label: 'Get Started',
          position: 'left',
        },
        {
          to: '/users/understanding-vaults',
          label: 'User Guide',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Resources',
          position: 'right',
          items: [
            {
              label: 'Charm Finance Integration',
              to: '/concepts/charm-finance-integration',
            },
            {
              label: 'Smart Contracts',
              to: '/contracts/eagle-ovault',
            },
            {
              label: 'API Reference',
              to: '/api/overview',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              label: 'Legal Documents',
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
            {
              type: 'html',
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/47-Eagle/eagle-ovault-clean',
            },
            {
              label: 'LayerZero Protocol',
              href: 'https://layerzero.network/',
            },
            {
              label: 'Charm Finance',
              href: 'https://charm.fi/',
            },
          ],
        },
        {
          href: 'https://github.com/47-Eagle/docs',
          label: 'GitHub',
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
              label: 'User Guide',
              to: '/users',
            },
            {
              label: 'Developer Docs',
              to: '/',
            },
            {
              label: 'API Reference',
              to: '/api/overview',
            },
          ],
        },
        {
          title: 'Protocol',
          items: [
            {
              label: 'Architecture',
              to: '/dev/architecture',
            },
            {
              label: 'Security',
              to: '/dev/security',
            },
            {
              label: 'Deployment',
              to: '/dev/deployment',
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
              label: 'LayerZero',
              href: 'https://layerzero.network/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 47 Eagle Finance. Built with LayerZero OVault Standard.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity', 'typescript', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

