import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '47 Eagle Finance',
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
      label: 'Core Concepts',
      collapsed: true,
      items: [
        'concepts/layerzero-integration',
      ],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      collapsed: true,
      items: [
        'contracts/eagle-ovault',
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

