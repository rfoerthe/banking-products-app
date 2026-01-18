import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import './accordion-item.component';

type AccordionItemStoryArgs = {
  heading?: string;
  open?: boolean;
  content?: string;
};

const meta: Meta<AccordionItemStoryArgs> = {
  title: 'Components/AccordionItem',
  tags: ['autodocs'],
  render: (args: AccordionItemStoryArgs) =>
    html`<accordion-item heading=${args.heading ?? ''} ?open=${args.open ?? false}>${unsafeHTML(
      args.content ?? ''
    )}</accordion-item>`,
  argTypes: {
    heading: { control: 'text' },
    open: { control: 'boolean' },
    content: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<AccordionItemStoryArgs>;

export const Closed: Story = {
  args: {
    heading: 'Section Title',
    open: false,
    content: 'This is the accordion content that is initially hidden.',
  },
};

export const Open: Story = {
  args: {
    heading: 'Section Title',
    open: true,
    content: 'This is the accordion content that is initially visible.',
  },
};

export const WithLongContent: Story = {
  args: {
    heading: 'Detailed Information',
    open: false,
    content: `
      <p style="margin: 0 0 1rem 0;">
        This is a longer content section that demonstrates how the accordion
        handles more substantial amounts of text. The content will be smoothly
        animated when toggling the accordion open and closed.
      </p>
      <p style="margin: 0 0 1rem 0;">
        You can include multiple paragraphs or other HTML elements as needed.
        The accordion will properly adjust its height based on the content.
      </p>
      <p style="margin: 0;">
        The animation duration is set to 200ms for a smooth user experience.
      </p>
    `,
  },
};

export const MultipleItems: Story = {
  render: () => html`
    <div>
      <accordion-item heading="Section 1">Content for section 1</accordion-item>
      <accordion-item heading="Section 2">Content for section 2</accordion-item>
      <accordion-item heading="Section 3">Content for section 3</accordion-item>
    </div>
  `,
};
