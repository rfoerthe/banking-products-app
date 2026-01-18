import { html } from 'lit';
import { fixture } from '../../test/fixture';
import { describe, it, expect } from 'vitest';
import type { AccordionItem } from '../accordion-item/accordion-item.component';
import type { Accordion } from './accordion.component';
import '../accordion-item/accordion-item.component';
import './accordion.component';

describe('Accordion Component', () => {
  it('should render the component', async () => {
    const el = await fixture<Accordion>(
      html`
        <app-accordion>
          <accordion-item heading="Item 1">Content 1</accordion-item>
        </app-accordion>
      `
    );
    expect(el).toBeTruthy();
  });

  it('should render multiple accordion items', async () => {
    const el = await fixture<Accordion>(
      html`
        <app-accordion>
          <accordion-item heading="Item 1">Content 1</accordion-item>
          <accordion-item heading="Item 2">Content 2</accordion-item>
          <accordion-item heading="Item 3">Content 3</accordion-item>
        </app-accordion>
      `
    );
    const items = el.querySelectorAll<AccordionItem>('accordion-item');
    expect(items.length).toBe(3);
  });

  it('should allow only one item open by default', async () => {
    const el = await fixture<Accordion>(
      html`
        <app-accordion>
          <accordion-item heading="Item 1">Content 1</accordion-item>
          <accordion-item heading="Item 2">Content 2</accordion-item>
        </app-accordion>
      `
    );

    const items = el.querySelectorAll<AccordionItem>('accordion-item');
    const firstButton = items[0].shadowRoot?.querySelector('button');
    const secondButton = items[1].shadowRoot?.querySelector('button');

    firstButton?.click();
    await el.updateComplete;
    await items[0].updateComplete;

    secondButton?.click();
    await el.updateComplete;
    await items[1].updateComplete;

    expect(items[0].hasAttribute('open')).toBe(false);
    expect(items[1].hasAttribute('open')).toBe(true);
  });

  it('should allow multiple items open when allowMultiple is true', async () => {
    const el = await fixture<Accordion>(
      html`
        <app-accordion allow-multiple>
          <accordion-item heading="Item 1">Content 1</accordion-item>
          <accordion-item heading="Item 2">Content 2</accordion-item>
        </app-accordion>
      `
    );

    const items = el.querySelectorAll<AccordionItem>('accordion-item');
    const firstButton = items[0].shadowRoot?.querySelector('button');
    const secondButton = items[1].shadowRoot?.querySelector('button');

    firstButton?.click();
    await el.updateComplete;
    await items[0].updateComplete;

    secondButton?.click();
    await el.updateComplete;
    await items[1].updateComplete;

    expect(items[0].hasAttribute('open')).toBe(true);
    expect(items[1].hasAttribute('open')).toBe(true);
  });

  it('should have proper ARIA role', async () => {
    const el = await fixture<Accordion>(
      html`
        <app-accordion>
          <accordion-item heading="Item 1">Content 1</accordion-item>
        </app-accordion>
      `
    );
    const container = el.shadowRoot?.querySelector('[role="region"]');
    expect(container).toBeTruthy();
  });
});
