import type { Preview } from '@storybook/web-components';
import { withLinks } from '@storybook/addon-links';

const preview: Preview = {
  decorators: [withLinks],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
