import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  partnersSidebar: [
    {
      type: 'doc',
      id: 'partner-home',
      label: 'Partnership Hub',
    },
    {
      type: 'category',
      label: 'Partnership Resources',
      collapsed: false,
      items: [
        'integration-guide',
      ],
    },
  ],
};

export default sidebars;
