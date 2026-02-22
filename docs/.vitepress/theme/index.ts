import DefaultTheme from 'vitepress/theme';
import MitreMatrix from './components/MitreMatrix.vue';
import TtpStats from './components/TtpStats.vue';
import './styles/custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MitreMatrix', MitreMatrix);
    app.component('TtpStats', TtpStats);
  },
};
