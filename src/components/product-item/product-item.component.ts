import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { BankingProduct } from '../../types/banking.types';
import { getStateColor, getStateLabel } from '../../utils/group-by-type';

@customElement('product-item')
export class ProductItem extends LitElement {
  @property({ type: Object }) product!: BankingProduct;

  static styles = css`
    :host {
      display: block;
    }

    .product-card {
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      padding: 1rem;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      transition: box-shadow 0.2s;
    }

    .product-card:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .state-indicator {
      display: inline-block;
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    .iban-text {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.875rem;
      color: #4b5563;
    }

    .balance {
      font-size: 1.125rem;
      font-weight: 600;
    }

    .positive-balance {
      color: #059669;
    }

    .negative-balance {
      color: #dc2626;
    }

    .account-name {
      font-size: 0.875rem;
      color: #6b7280;
    }
  `;

  render() {
    const stateColor = getStateColor(this.product.accountState);
    const stateLabel = getStateLabel(this.product.accountState);

    return html`
      <div class="product-card">
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="font-semibold text-gray-900">
              ${this.product.accountName || this.formatAccountType(this.product.accountType)}
            </h3>
            <p class="account-name">${this.product.accountType}</p>
          </div>
          <div class="flex items-center">
            <span
              class="state-indicator"
              style="background-color: ${stateColor}"
              title="${stateLabel}"
            ></span>
            <span class="text-xs font-medium text-gray-700">${stateLabel}</span>
          </div>
        </div>

        <div class="mb-3">
          <p class="text-xs text-gray-500 mb-1">IBAN</p>
          <p class="iban-text">${this.formatIban(this.product.iban)}</p>
        </div>

        ${this.product.balance !== undefined
          ? html`
              <div class="flex items-baseline justify-between mb-2">
                <span class="balance ${this.product.balance >= 0 ? 'positive-balance' : 'negative-balance'}">
                  ${this.formatBalance(this.product.balance)}
                </span>
                <span class="text-sm text-gray-500">${this.product.currency || 'EUR'}</span>
              </div>
            `
          : ''}

        ${this.product.lastActivity
          ? html`
              <p class="text-xs text-gray-500">
                Last activity: ${this.formatDate(this.product.lastActivity)}
              </p>
            `
          : ''}
      </div>
    `;
  }

  private formatIban(iban: string): string {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  }

  private formatBalance(balance: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance);
  }

  private formatDate(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  private formatAccountType(type: string): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-item': ProductItem;
  }
}
