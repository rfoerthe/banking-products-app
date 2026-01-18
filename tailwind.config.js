export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'account-active': '#10b981',
        'account-inactive': '#f59e0b',
        'account-closed': '#6b7280',
        'account-frozen': '#3b82f6',
      },
    },
  },
  plugins: [],
};
