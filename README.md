# Banking Products Web App

A modern web application built with LIT web components for displaying and managing banking products (IBAN, account type, account state) with an accordion component to group products by type.

## Features

- **Web Components** - Built with LIT and Web Components for reusability
- **Accordion UI** - Collapsible sections to organize products by account type
- **TypeScript** - Full type safety with TypeScript
- **Tailwind CSS** - Utility-first CSS with PostCSS (Tailwind v4)
- **Testing** - Comprehensive test suite with Vitest and Playwright
- **Storybook** - Component documentation and development environment
- **Responsive Design** - Mobile-friendly layout

## Project Structure

```
banking-products-app/
├── .storybook/          # Storybook configuration
├── src/
│   ├── components/      # Web components
│   │   ├── accordion/
│   │   ├── accordion-item/
│   │   ├── product-item/
│   │   └── products-list/
│   ├── types/           # TypeScript type definitions
│   ├── data/            # Mock data
│   ├── utils/           # Utility functions
│   ├── test/            # Test helpers
│   ├── global.css       # Global styles
│   ├── index.ts         # Library exports
│   └── main.ts          # Application entry point
├── index.html           # Entry HTML
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Test configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration for Shadow DOM
└── tsconfig.json        # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Tests

Run tests in watch mode:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

### Storybook

View components in Storybook:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`

### Building

Create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Storybook (Static)

Build and serve the static Storybook output:

```bash
npm run build:storybook
npm run serve:storybook
```

## Components

### ProductItem

Displays an individual banking product with:
- Account name
- Account type (checking, savings, credit, investment)
- IBAN
- Account state (active, inactive, closed, frozen)
- Balance with currency
- Last activity date

```tsx
<product-item .product=${product}></product-item>
```

### AccordionItem

A single collapsible section with:
- Expandable/collapsible content
- ARIA-compliant for accessibility
- Smooth animations
- Keyboard navigation support

```tsx
<accordion-item heading="Section Title">
  Content goes here
</accordion-item>
```

### Accordion

Container for multiple accordion items:
- Manages open/closed state
- Single or multiple items open simultaneously (controlled by `allow-multiple` attribute)
- Proper ARIA roles and attributes

```tsx
<app-accordion allow-multiple>
  <accordion-item heading="Item 1">Content 1</accordion-item>
  <accordion-item heading="Item 2">Content 2</accordion-item>
</app-accordion>
```

### ProductsList

Main container component that:
- Groups products by account type
- Integrates accordion with product items
- Handles loading/error states
- Displays empty state

```tsx
<products-list
  .products=${products}
  ?loading=${isLoading}
  .error=${error}
></products-list>
```

## Type Definitions

```typescript
export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';
export type AccountState = 'active' | 'inactive' | 'closed' | 'frozen';

export interface BankingProduct {
  id: string;
  iban: string;
  accountType: AccountType;
  accountState: AccountState;
  balance?: number;
  currency?: string;
  accountName?: string;
  lastActivity?: Date;
}
```

## Technologies

- **Lit** ^3.3.2 - Lightweight web component library
- **Vite** ^7.3.1 - Fast build tool and dev server
- **TypeScript** ^5.9.3 - Type-safe JavaScript
- **Tailwind CSS** ^4.1.18 - Utility-first CSS framework
- **Vitest** ^4.0.17 - Unit and integration tests
- **Storybook** ^10.1.11 - Component documentation
- **Playwright** ^1.57.0 - Browser testing

## Testing Strategy

- **Unit Tests** - Test individual components in isolation
- **Integration Tests** - Test component composition and data flow
- **Browser Tests** - Use Playwright for realistic rendering and interactions
- **A11y Tests** - Ensure accessibility with keyboard navigation and ARIA

## Key Features

### Tailwind CSS in Shadow DOM

Tailwind is processed via `@tailwindcss/postcss` and applied to the document through `src/global.css`.

### State-Based Styling

Products are styled based on their account state:
- **Active** - Green indicator
- **Inactive** - Yellow indicator
- **Closed** - Gray indicator
- **Frozen** - Blue indicator

### Accessibility

All components follow WAI-ARIA guidelines:
- Proper ARIA roles and attributes
- Keyboard navigation support
- Focus management
- Semantic HTML

## Performance

- Efficient Shadow DOM encapsulation
- Minimal re-renders with LIT's reactive properties
- Optimized bundle size with tree-shaking support
- Fast development server with Vite HMR

## License

MIT
