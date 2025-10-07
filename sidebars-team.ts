import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  teamsSidebar: [
    {
      type: 'doc',
      id: 'team-home',
      label: 'Team Portal',
    },
    {
      type: 'category',
      label: 'Team Resources',
      collapsed: false,
      items: [
        'internal-tools',
        'ci-cd-protected',
        'deployment-protected',
      ],
    },
  ],
};

export default sidebars;
