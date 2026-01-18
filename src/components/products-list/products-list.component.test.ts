import { html } from 'lit';
import { fixture } from '../../test/fixture';
import { describe, it, expect } from 'vitest';
import type { BankingProduct } from '../../types/banking.types';
import './products-list.component';

describe('ProductsList Component', () => {
  const mockProducts: BankingProduct[] = [
    {
      id: '1',
      iban: 'DE89370400440532013000',
      accountType: 'checking',
      accountState: 'active',
      balance: 5250.5,
      currency: 'EUR',
      accountName: 'Main Account',
      lastActivity: new Date('2025-01-15'),
    },
    {
      id: '2',
      iban: 'DE75512108001234567890',
      accountType: 'savings',
      accountState: 'active',
      balance: 25000,
      currency: 'EUR',
      accountName: 'Savings Account',
      lastActivity: new Date('2025-01-10'),
    },
  ];

  it('should render the component', async () => {
    const el = await fixture<HTMLElement>(
      html`<products-list .products=${mockProducts}></products-list>`
    );
    expect(el).toBeTruthy();
  });

  it('should display the title', async () => {
    const el = await fixture<HTMLElement>(
      html`<products-list .products=${mockProducts}></products-list>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Banking Products');
  });

  it('should display accordion items for each account type', async () => {
    const el = await fixture<HTMLElement>(
      html`<products-list .products=${mockProducts}></products-list>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Checking');
    expect(text).toContain('Savings');
  });

  it('should display loading state', async () => {
    const el = await fixture<HTMLElement>(
      html`<products-list .loading=${true}></products-list>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Loading products');
  });

  it('should display error message', async () => {
    const el = await fixture<HTMLElement>(
      html`<products-list .error=${'Failed to load products'}></products-list>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Failed to load products');
  });

  it('should display empty state', async () => {
    const el = await fixture<HTMLElement>(html`<products-list .products=${[]}></products-list>`);
    const text = el.textContent || '';
    expect(text).toContain('No banking products available');
  });

  it('should count products in accordion headers', async () => {
    const el = await fixture<HTMLElement>(
      html`<products-list .products=${mockProducts}></products-list>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Checking (1)');
    expect(text).toContain('Savings (1)');
  });

  it('should render product items', async () => {
    const el = await fixture<HTMLElement>(
      html`<products-list .products=${mockProducts}></products-list>`
    );
    const products = el.querySelectorAll('product-item');
    expect(products.length).toBeGreaterThan(0);
  });
});
