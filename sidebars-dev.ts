import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  developersSidebar: [
    {
      type: 'doc',
      id: 'dev-home',
      label: 'Developer Overview',
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
    {
      type: 'category',
      label: 'API & Integration',
      collapsed: false,
      items: [
        'overview',
      ],
    },
    {
      type: 'category',
      label: 'Internal Resources',
      collapsed: true,
      items: [
        'ci-cd-protected',
        'deployment-protected',
      ],
    },
  ],
};

export default sidebars;
