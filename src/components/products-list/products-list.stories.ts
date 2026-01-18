import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { BankingProduct } from '../../types/banking.types';
import './products-list.component';

type ProductsListStoryArgs = {
  products?: BankingProduct[];
  loading?: boolean;
  error?: string;
};

const meta: Meta<ProductsListStoryArgs> = {
  title: 'Components/ProductsList',
  tags: ['autodocs'],
  render: (args: ProductsListStoryArgs) =>
    html`<products-list .products=${args.products ?? []} ?loading=${args.loading ?? false} .error=${args.error ?? ''}></products-list>`,
};

export default meta;
type Story = StoryObj<ProductsListStoryArgs>;

const mockProducts: BankingProduct[] = [
  {
    id: '1',
    iban: 'DE89370400440532013000',
    accountType: 'checking',
    accountState: 'active',
    balance: 5250.5,
    currency: 'EUR',
    accountName: 'Main Checking Account',
    lastActivity: new Date('2025-01-15'),
  },
  {
    id: '2',
    iban: 'DE75512108001234567890',
    accountType: 'savings',
    accountState: 'active',
    balance: 25000,
    currency: 'EUR',
    accountName: 'Emergency Fund',
    lastActivity: new Date('2025-01-10'),
  },
  {
    id: '3',
    iban: 'DE89370400440532013001',
    accountType: 'checking',
    accountState: 'inactive',
    balance: 1200.75,
    currency: 'EUR',
    accountName: 'Old Checking Account',
    lastActivity: new Date('2024-11-20'),
  },
  {
    id: '4',
    iban: 'DE75512108001234567891',
    accountType: 'credit',
    accountState: 'active',
    balance: -3500,
    currency: 'EUR',
    accountName: 'Credit Card',
    lastActivity: new Date('2025-01-18'),
  },
  {
    id: '5',
    iban: 'DE89370400440532013002',
    accountType: 'investment',
    accountState: 'active',
    balance: 50000,
    currency: 'EUR',
    accountName: 'Investment Portfolio',
    lastActivity: new Date('2025-01-17'),
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
  },
};

export const Empty: Story = {
  args: {
    products: [],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Failed to load banking products. Please try again later.',
  },
};

export const SingleProduct: Story = {
  args: {
    products: [mockProducts[0]],
  },
};

export const MultipleAccountTypes: Story = {
  args: {
    products: mockProducts,
  },
};
