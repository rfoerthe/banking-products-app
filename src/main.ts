import './global.css';
import {
  ProductItem,
  AccordionItem,
  Accordion,
  ProductsList,
} from './index';
import { mockProducts } from './data/mock-products';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const productsList = document.querySelector<ProductsList>('products-list');

  if (productsList) {
    // Set initial products
    productsList.products = mockProducts;

    // Optional: simulate loading and error states for demonstration
    // Uncomment to test:
    // productsList.loading = true;
    // setTimeout(() => {
    //   productsList.loading = false;
    //   productsList.products = mockProducts;
    // }, 2000);
  }
});

// Export components for external use
export { ProductItem, AccordionItem, Accordion, ProductsList, mockProducts };
