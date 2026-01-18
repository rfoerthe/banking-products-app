import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { BankingProduct } from '../../types/banking.types';
import './product-item.component';

type ProductItemStoryArgs = {
  product: BankingProduct;
};

const meta: Meta<ProductItemStoryArgs> = {
  title: 'Components/ProductItem',
  tags: ['autodocs'],
  render: (args: ProductItemStoryArgs) =>
    html`<product-item .product=${args.product}></product-item>`,
};

export default meta;
type Story = StoryObj<ProductItemStoryArgs>;

const baseProduct: BankingProduct = {
  id: '1',
  iban: 'DE89370400440532013000',
  accountType: 'checking',
  accountState: 'active',
  balance: 5250.5,
  currency: 'EUR',
  accountName: 'Main Checking Account',
  lastActivity: new Date('2025-01-15'),
};

export const Active: Story = {
  args: {
    product: baseProduct,
  },
};

export const Inactive: Story = {
  args: {
    product: {
      ...baseProduct,
      accountState: 'inactive',
      accountName: 'Old Account',
    },
  },
};

export const Closed: Story = {
  args: {
    product: {
      ...baseProduct,
      accountState: 'closed',
      accountName: 'Closed Account',
      balance: 0,
    },
  },
};

export const Frozen: Story = {
  args: {
    product: {
      ...baseProduct,
      accountState: 'frozen',
      accountName: 'Frozen Account',
    },
  },
};

export const CreditCard: Story = {
  args: {
    product: {
      id: '4',
      iban: 'DE75512108001234567890',
      accountType: 'credit',
      accountState: 'active',
      balance: -3500,
      currency: 'EUR',
      accountName: 'Credit Card',
      lastActivity: new Date('2025-01-18'),
    },
  },
};

export const NegativeBalance: Story = {
  args: {
    product: {
      ...baseProduct,
      balance: -1500,
    },
  },
};

export const NoBalance: Story = {
  args: {
    product: {
      ...baseProduct,
      balance: undefined,
    },
  },
};

export const SavingsAccount: Story = {
  args: {
    product: {
      id: '2',
      iban: 'DE75512108001234567890',
      accountType: 'savings',
      accountState: 'active',
      balance: 25000,
      currency: 'EUR',
      accountName: 'Emergency Fund',
      lastActivity: new Date('2025-01-10'),
    },
  },
};
