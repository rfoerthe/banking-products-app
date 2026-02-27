# Agent Guidelines for Banking Products App

This document provides instructions for agentic coding agents operating in this repository.

## Build, Lint, and Test Commands

### Development
- `npm run dev` - Start Vite dev server (opens at http://localhost:5173)
- `npm run build` - Production build (outputs to `dist/`)
- `npm run preview` - Preview production build locally

### Testing
- `npm test` - Run all tests using Vitest
- `npm test -- <pattern>` - Run tests matching a file pattern (e.g., `npm test -- accordion`)
- `npm test -- src/components/accordion/accordion.component.test.ts` - Run a single test file
- `npm test:ui` - Run tests with interactive UI dashboard

### Storybook (Component Documentation)
- `npm run storybook` - Start Storybook dev server (port 6006)
- `npm run build:storybook` - Build Storybook static site
- `npm run serve:storybook` - Serve built Storybook

### Cleanup
- `npm run clean` - Remove dist, storybook-static, and node_modules

**Note:** There is no linter (ESLint) or formatter (Prettier) configured. Maintain consistent style manually per guidelines below.

## Code Style Guidelines

### TypeScript & General Rules
- **Target**: ES2022 with strict mode enabled
- **Module format**: ESNext (no CommonJS)
- **Type safety**: Always use `strict: true` rules; avoid `any` types
- **Decorators**: Enabled via `experimentalDecorators: true`

### Imports
- Use ES6 `import`/`export` syntax only (no CommonJS)
- Separate imports into logical groups:
  1. External dependencies (lit, @lit/decorators)
  2. Types (use `import type { ... }` for type-only imports)
  3. Local files (components, utils, types)
- Example:
  ```typescript
  import { LitElement, html, css } from 'lit';
  import { customElement, property } from 'lit/decorators.js';
  import type { BankingProduct } from '../types/banking.types';
  import { groupByType } from '../utils/group-by-type';
  ```

### Naming Conventions
- **Components**: Use `kebab-case` for custom element names (e.g., `app-accordion`, `product-item`)
- **Files**: Use `kebab-case` for filenames (e.g., `accordion.component.ts`, `products-list.component.ts`)
- **Classes**: Use `PascalCase` (e.g., `class Accordion extends LitElement`)
- **Properties/methods**: Use `camelCase`
- **Constants**: Use `UPPER_SNAKE_CASE`
- **Interfaces/Types**: Use `PascalCase` and suffix with `Type` or `Interface` (e.g., `BankingProduct`, `AccountType`)

### Lit Components
- Use `@customElement` decorator to register custom elements
- Use `@property` decorator for public properties
- Always declare HTML element interface in global namespace:
  ```typescript
  declare global {
    interface HTMLElementTagNameMap {
      'component-name': ComponentClass;
    }
  }
  ```
- Use `css` template literal for component styles
- Use `html` template literal for markup
- Reflect boolean attributes to DOM: `@property({ type: Boolean, reflect: true })`
- Use private methods (prefix `#` or `private`) for internal logic
- Handle lifecycle: implement `connectedCallback`, `disconnectedCallback` as needed
- Use `updateComplete` promise to await Lit updates in tests

### Component Organization
- One component per file
- File structure: `component-name/component-name.component.ts`
- Co-locate story files: `component-name/component-name.stories.ts`
- Co-locate tests: `component-name/component-name.component.test.ts`

### Types & Interfaces
- Define types in `src/types/` directory
- Export all public types: `export type` and `export interface`
- Use optional properties (`?:`) for non-required fields
- Example location: `src/types/banking.types.ts`

### Error Handling
- Use try-catch for async operations where appropriate
- Provide meaningful error messages
- Log errors for debugging (console.error for production logging)
- Gracefully handle missing data with null coalescing (`??`) or optional chaining (`?.`)
- Example: `const value = obj?.property ?? defaultValue`

### Testing (Vitest + Lit)
- Place test files adjacent to source: `component.component.test.ts`
- Use `describe()` and `it()` blocks (globals enabled)
- Use `fixture()` helper to render components in tests
- Test structure:
  ```typescript
  import { html } from 'lit';
  import { fixture } from '../../test/fixture';
  import { describe, it, expect } from 'vitest';
  import './component.component';

  describe('Component Name', () => {
    it('should render correctly', async () => {
      const el = await fixture<ComponentClass>(html`<component-name></component-name>`);
      expect(el).toBeTruthy();
    });
  });
  ```
- Always await `updateComplete` before assertions on Lit elements
- Test component properties, attributes, event handlers, and accessibility (ARIA)

### Styling
- Use TailwindCSS for utility-based styling (configured via `tailwind.config.js`)
- Component CSS: Use `css` template literal in `static styles`
- Global styles: `src/global.css`
- Scoped styles automatically with Lit (Shadow DOM)
- Use CSS variables for theming when appropriate
- Example:
  ```typescript
  static styles = css`
    :host { display: block; }
    .container { padding: 1rem; }
  `;
  ```

### Accessibility
- Include ARIA roles, labels, and attributes where appropriate
- Example: `role="region"`, `aria-label="description"`
- Test ARIA attributes in component tests
- Use semantic HTML elements

### File Organization
```
src/
├── components/        # Lit components
│   ├── accordion/
│   ├── product-item/
│   └── products-list/
├── data/             # Mock data and constants
├── test/             # Test utilities (e.g., fixture helper)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── global.css        # Global styles
├── index.ts          # Main entry point
├── main.ts           # App initialization
└── vite-env.d.ts     # Vite type definitions
```

## Key Dependencies
- **Lit 3.x**: Web component framework with reactive properties
- **Vite 7.x**: Fast ES module bundler
- **Vitest 4.x**: TypeScript-native test runner
- **Storybook 10.x**: Component documentation and testing
- **TailwindCSS 4.x**: Utility CSS framework
- **TypeScript 5.x**: Static type checking

## Notes for Agents
- Always run tests before committing: `npm test`
- Check build output: `npm run build` (verify no errors)
- TypeScript will catch many errors at compile time; trust the strict mode
- When creating new components, follow the accordion pattern (structure, tests, stories)
- Test file patterns: `*.test.ts` or `*.spec.ts` (excluded from tsconfig)
- Shadow DOM encapsulation handles style scoping; no BEM needed
