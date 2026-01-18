import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BankingProduct, AccountType } from '../../types/banking.types';
import { groupByAccountType } from '../../utils/group-by-type';
import '../accordion/accordion.component';
import '../accordion-item/accordion-item.component';
import '../product-item/product-item.component';

@customElement('products-list')
export class ProductsList extends LitElement {
  @property({ type: Array }) products: BankingProduct[] = [];
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) error: string = '';

  static styles = css`
    :host {
      display: block;
    }

    .products-container {
      max-width: 56rem;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .header {
      margin-bottom: 2rem;
    }

    .title {
      font-size: 1.875rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      color: #4b5563;
      margin: 0;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: #4b5563;
    }

    .error {
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.5rem;
      padding: 1rem;
      color: #991b1b;
      margin-bottom: 1.5rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #4b5563;
    }

    .products-grid {
      display: grid;
      gap: 0.5rem;
    }

    .account-type-title {
      font-size: 1.125rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .product-count {
      font-size: 0.875rem;
      color: #6b7280;
      margin-left: 0.5rem;
    }
  `;

  render() {
    if (this.loading) {
      return html`
        <div class="products-container">
          <div class="loading">Loading products...</div>
        </div>
      `;
    }

    if (this.error) {
      return html`
        <div class="products-container">
          <div class="error">${this.error}</div>
        </div>
      `;
    }

    if (!this.products || this.products.length === 0) {
      return html`
        <div class="products-container">
          <div class="empty-state">No banking products available</div>
        </div>
      `;
    }

    const grouped = groupByAccountType(this.products);
    const accountTypes: AccountType[] = ['checking', 'savings', 'credit', 'investment'];

    return html`
      <div class="products-container">
        <div class="header">
          <h1 class="title">Banking Products</h1>
          <p class="subtitle">Manage your accounts and view account details</p>
        </div>

        <app-accordion>
          ${accountTypes.map((type) => {
            const items = grouped[type];
            if (items.length === 0) return null;

            return html`
              <accordion-item heading="${this.formatAccountType(type)} (${items.length})">
                <div class="products-grid">
                  ${items.map((product) => html`<product-item .product=${product}></product-item>`)}
                </div>
              </accordion-item>
            `;
          })}
        </app-accordion>
      </div>
    `;
  }

  private formatAccountType(type: string): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'products-list': ProductsList;
  }
}
