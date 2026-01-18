// Export all component types
export { ProductItem } from './components/product-item/product-item.component';
export { AccordionItem } from './components/accordion-item/accordion-item.component';
export { Accordion } from './components/accordion/accordion.component';
export { ProductsList } from './components/products-list/products-list.component';

// Export types
export type { BankingProduct, AccountType, AccountState } from './types/banking.types';

// Export utilities
export { groupByAccountType, getStateColor, getStateLabel } from './utils/group-by-type';

// Export mock data
export { mockProducts } from './data/mock-products';
