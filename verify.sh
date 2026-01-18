#!/bin/bash

echo "🔍 Banking Products Web App - Verification Script"
echo "=================================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node --version

# Check npm
echo "✓ Checking npm..."
npm --version

# Check if dependencies are installed
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
  echo "  ✓ node_modules directory exists"
else
  echo "  ✗ node_modules directory missing - run 'npm install'"
  exit 1
fi

# Check critical files
echo "✓ Checking critical files..."
files=(
  "package.json"
  "tsconfig.json"
  "vite.config.ts"
  "vitest.config.ts"
  "tailwind.config.js"
  "postcss.config.js"
  ".storybook/main.ts"
  ".storybook/preview.ts"
  "src/index.ts"
  "src/main.ts"
  "index.html"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file missing"
  fi
done

echo ""
echo "✓ Checking components..."
components=(
  "src/components/product-item/product-item.component.ts"
  "src/components/accordion-item/accordion-item.component.ts"
  "src/components/accordion/accordion.component.ts"
  "src/components/products-list/products-list.component.ts"
)

for component in "${components[@]}"; do
  if [ -f "$component" ]; then
    echo "  ✓ $(basename $component)"
  else
    echo "  ✗ $(basename $component) missing"
  fi
done

echo ""
echo "✓ Checking types and utilities..."
if [ -f "src/types/banking.types.ts" ]; then
  echo "  ✓ Banking types"
fi

if [ -f "src/utils/group-by-type.ts" ]; then
  echo "  ✓ Group utility"
fi

if [ -f "src/data/mock-products.ts" ]; then
  echo "  ✓ Mock data"
fi

echo ""
echo "=================================================="
echo "✓ Setup verification complete!"
echo ""
echo "Next steps:"
echo "1. npm run dev       - Start development server"
echo "2. npm run storybook - Open Storybook"
echo "3. npm test          - Run tests"
echo "4. npm run build     - Create production build"
echo ""
