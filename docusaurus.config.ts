import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Eagle Omnichain Vault',
  tagline: 'Next-generation omnichain DeFi vault powered by LayerZero',
  favicon: 'img/eagle-favicon.ico',

  // Set the production URL of your site here
  url: 'https://47-eagle.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/docs/',

  // GitHub pages deployment config
  organizationName: '47-eagle',
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
      title: 'Eagle Vault',
      logo: {
        alt: 'Eagle Omnichain Vault Logo',
        src: 'img/eagle-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Links',
          position: 'right',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/47-Eagle/eagle-ovault-clean',
            },
            {
              label: 'LayerZero Protocol',
              href: 'https://layerzero.network/',
            },
            {
              label: 'Uniswap V3',
              href: 'https://uniswap.org/',
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
      copyright: `Copyright © ${new Date().getFullYear()} Eagle Protocol. Built with ❤️ using LayerZero OVault Standard.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity', 'typescript', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

