import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './accordion.component';
import '../accordion-item/accordion-item.component';

type AccordionStoryArgs = {
  allowMultiple?: boolean;
  items?: Array<{ heading: string; content: string }>;
};

const fallbackItems: AccordionStoryArgs['items'] = [
  { heading: 'Section 1', content: 'Content for section 1' },
  { heading: 'Section 2', content: 'Content for section 2' },
  { heading: 'Section 3', content: 'Content for section 3' },
];

const meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  render: (args: AccordionStoryArgs) => {
    const items = args.items ?? fallbackItems;

    return html`
      <app-accordion .allowMultiple=${args.allowMultiple ?? false}>
        ${items.map((item) => html`<accordion-item heading=${item.heading}>${item.content}</accordion-item>`)}
      </app-accordion>
    `;
  },
  args: {
    allowMultiple: false,
    items: [
      { heading: 'Overview', content: '...' },
      { heading: 'Usage', content: '...' },
    ],
  },
  argTypes: {
    allowMultiple: { control: 'boolean' },
  },
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

export const SingleOpen: Story = {
  args: {
    allowMultiple: false,
  },
};

export const MultipleOpen: Story = {
  args: {
    allowMultiple: true,
  },
};

export const CustomItems: Story = {
  args: {
    items: [
      { heading: 'Getting Started', content: 'Follow these steps to get started...' },
      { heading: 'Configuration', content: 'Configure the application with these options...' },
      { heading: 'Troubleshooting', content: 'If you encounter issues, check this section...' },
    ],
  },
};
