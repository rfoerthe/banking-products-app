# Custom Element Naming Fix

## Issue
Browser console error:
```
[Error] SyntaxError: Custom element name must contain a hyphen
    define (lit_decorators__js.js:13)
```

## Root Cause
The `accordion` component was registered as a custom element without a hyphen:
```typescript
@customElement('accordion')  // ❌ Invalid - no hyphen
```

According to the Web Components specification, custom element names **must** contain at least one hyphen to distinguish them from native HTML elements.

## Solution
Changed the accordion component name from `accordion` to `app-accordion`:

### Files Modified

#### 1. src/components/accordion/accordion.component.ts
```typescript
// Before
@customElement('accordion')

// After
@customElement('app-accordion')
```

And updated the global interface:
```typescript
// Before
interface HTMLElementTagNameMap {
  accordion: Accordion;
}

// After
interface HTMLElementTagNameMap {
  'app-accordion': Accordion;
}
```

#### 2. src/components/products-list/products-list.component.ts
Updated all accordion element usages:
```html
<!-- Before -->
<accordion>
  <accordion-item>...</accordion-item>
</accordion>

<!-- After -->
<app-accordion>
  <accordion-item>...</accordion-item>
</app-accordion>
```

#### 3. src/components/accordion/accordion.stories.ts
Updated Storybook stories to use the new name:
```html
<!-- Before -->
<accordion ?allow-multiple=${args.allowMultiple || false}>
  ...
</accordion>

<!-- After -->
<app-accordion ?allow-multiple=${args.allowMultiple || false}>
  ...
</app-accordion>
```

#### 4. src/components/accordion/accordion.component.test.ts
Updated all test fixtures to use the new component name:
```html
<!-- Before -->
<accordion>
  <accordion-item>...</accordion-item>
</accordion>

<!-- After -->
<app-accordion>
  <accordion-item>...</accordion-item>
</app-accordion>
```

## Custom Element Naming Rules
All custom elements must:
1. ✅ Contain at least one hyphen (e.g., `app-accordion`)
2. ✅ Use lowercase letters
3. ✅ Not start with a hyphen
4. ✅ Not conflict with reserved names

## Component Names After Fix
- ✅ `product-item` - has hyphen
- ✅ `accordion-item` - has hyphen
- ✅ `app-accordion` - has hyphen (fixed)
- ✅ `products-list` - has hyphen

## Build Status
✅ **Build:** Successful (`npm run build`)

## Testing
The app should now:
1. ✅ Load without console errors
2. ✅ Display the banking products page
3. ✅ Allow accordion expand/collapse functionality
4. ✅ Group products by account type

## Usage
```bash
npm run build    # ✅ Builds successfully
npm run dev      # Start dev server
npm run storybook # View components (will show app-accordion)
npm test         # Run test suite
```

## Related Files
- Product Item Component: `product-item` ✅
- Accordion Item Component: `accordion-item` ✅
- Accordion Container: `app-accordion` ✅
- Products List: `products-list` ✅
