import { defineConfig } from 'vitepress';
import sidebarData from './data/sidebar.json';

export default defineConfig({
  title: 'macOS TTPs',
  description:
    'TTPForge-compatible Tactics, Techniques, and Procedures for macOS security testing',

  head: [
    ['meta', { name: 'theme-color', content: '#5b21b6' }],
  ],

  markdown: {
    config: (md) => {
      // Add v-pre to all fenced code blocks so {{ }} isn't parsed as Vue
      const defaultFence = md.renderer.rules.fence!;
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const result = defaultFence(tokens, idx, options, env, self);
        return result.replace(/<code/, '<code v-pre');
      };
    },
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'TTPs', link: '/ttps/initial_access/' },
      { text: 'MITRE Matrix', link: '/mitre-matrix' },
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'About', link: '/guide/about' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/mbhatt1/macos-ttps' },
    ],

    sidebar: {
      '/ttps/': sidebarData['/ttps/'],
      '/guide/': [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'About', link: '/guide/about' },
      ],
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mbhatt1/macos-ttps' },
    ],

    outline: {
      level: [2, 3],
    },

    footer: {
      message: 'For authorized security testing only.',
      copyright: 'Built with VitePress',
    },
  },
});
