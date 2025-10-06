import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  usersSidebar: [
    {
      type: 'doc',
      id: 'user-home',
      label: 'Welcome',
    },
    {
      type: 'doc',
      id: 'interactive-3d',
      label: 'How it Works',
    },
    {
      type: 'doc',
      id: 'how-to-use',
      label: 'Getting Started',
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ',
    },
  ],
};

export default sidebars;
