import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  investorsSidebar: [
    {
      type: 'doc',
      id: 'investor-home',
      label: 'Investor Relations',
    },
    {
      type: 'category',
      label: 'Financial Information',
      collapsed: false,
      items: [
        'financial-overview',
      ],
    },
  ],
};

export default sidebars;
