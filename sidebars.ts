import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '47 Eagle Finance',
    },
    
    // USER DOCUMENTATION
    {
      type: 'html',
      value: '<div class="sidebar-divider">USER GUIDE</div>',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'users/getting-started',
        'users/understanding-vaults',
        'users/user-faq',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: true,
      items: [
        'concepts/layerzero-integration',
        'concepts/charm-finance-integration',
      ],
    },
    
    // DEVELOPER DOCUMENTATION
    {
      type: 'html',
      value: '<div class="sidebar-divider">DEVELOPER DOCS</div>',
    },
    {
      type: 'category',
      label: 'Developer Guide',
      collapsed: false,
      items: [
        'dev/overview',
        'dev/quick-start',
        'dev/architecture',
        'dev/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      collapsed: true,
      items: [
        'contracts/eagle-ovault',
        'contracts/charm-alpha-vault-strategy',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: true,
      items: [
        'api/overview',
      ],
    },
  ],
};

export default sidebars;

