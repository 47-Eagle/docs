import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome to 47 Eagle Finance',
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      collapsed: false,
      items: [
        'contracts/eagle-ovault',
        'contracts/charm-alpha-vault-strategy',
      ],
    },
    {
      type: 'category',
      label: 'Legal Documentation',
      collapsed: true,
      items: [
        'legal/terms-of-service',
        'legal/privacy-policy',
        'legal/risk-disclosures',
      ],
    },
  ],
};

export default sidebars;
