import { html } from 'lit';
import { fixture } from '../../test/fixture';
import { describe, it, expect } from 'vitest';
import type { BankingProduct } from '../../types/banking.types';
import './product-item.component';

describe('ProductItem Component', () => {
  const mockProduct: BankingProduct = {
    id: '1',
    iban: 'DE89370400440532013000',
    accountType: 'checking',
    accountState: 'active',
    balance: 5250.5,
    currency: 'EUR',
    accountName: 'Main Account',
    lastActivity: new Date('2025-01-15'),
  };

  it('should render the component', async () => {
    const el = await fixture<HTMLElement>(
      html`<product-item .product=${mockProduct}></product-item>`
    );
    expect(el).toBeTruthy();
  });

  it('should display account name', async () => {
    const el = await fixture<HTMLElement>(
      html`<product-item .product=${mockProduct}></product-item>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Main Account');
  });

  it('should display IBAN formatted', async () => {
    const el = await fixture<HTMLElement>(
      html`<product-item .product=${mockProduct}></product-item>`
    );
    const text = el.textContent || '';
    expect(text).toContain('DE89 3704 0044 0532 013000');
  });

  it('should display account state', async () => {
    const el = await fixture<HTMLElement>(
      html`<product-item .product=${mockProduct}></product-item>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Active');
  });

  it('should display balance', async () => {
    const el = await fixture<HTMLElement>(
      html`<product-item .product=${mockProduct}></product-item>`
    );
    const text = el.textContent || '';
    expect(text).toContain('5,250.50');
  });

  it('should display negative balance in red', async () => {
    const negativeProduct: BankingProduct = {
      ...mockProduct,
      balance: -3500,
    };
    const el = await fixture<HTMLElement>(
      html`<product-item .product=${negativeProduct}></product-item>`
    );
    expect(el).toBeTruthy();
  });

  it('should handle products without balance', async () => {
    const productNoBalance: BankingProduct = {
      ...mockProduct,
      balance: undefined,
    };
    const el = await fixture<HTMLElement>(
      html`<product-item .product=${productNoBalance}></product-item>`
    );
    expect(el).toBeTruthy();
  });

  it('should display currency', async () => {
    const el = await fixture<HTMLElement>(
      html`<product-item .product=${mockProduct}></product-item>`
    );
    const text = el.textContent || '';
    expect(text).toContain('EUR');
  });

  it('should display last activity date', async () => {
    const el = await fixture<HTMLElement>(
      html`<product-item .product=${mockProduct}></product-item>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Last activity');
  });
});
