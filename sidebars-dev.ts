import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  developersSidebar: [
    {
      type: 'doc',
      id: 'dev-home',
      label: 'Developer Home',
    },
    {
      type: 'category',
      label: 'Protocol Overview',
      collapsed: false,
      items: [
        'overview',
      ],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      collapsed: false,
      items: [
        'eagle-ovault',
        'charm-alpha-vault-strategy',
      ],
    },
    {
      type: 'category',
      label: 'Quick Start Guide',
      collapsed: false,
      items: [
        'quick-start',
        'architecture',
      ],
    },
  ],
};

export default sidebars;
