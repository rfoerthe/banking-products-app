import { html } from 'lit';
import { fixture } from '../../test/fixture';
import { describe, it, expect } from 'vitest';
import type { AccordionItem } from './accordion-item.component';
import './accordion-item.component';

describe('AccordionItem Component', () => {
  it('should render the component', async () => {
    const el = await fixture<AccordionItem>(
      html`<accordion-item heading="Test Heading">Content</accordion-item>`
    );
    expect(el).toBeTruthy();
  });

  it('should display the heading', async () => {
    const el = await fixture<AccordionItem>(
      html`<accordion-item heading="Test Heading">Content</accordion-item>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Test Heading');
  });

  it('should have closed state by default', async () => {
    const el = await fixture<AccordionItem>(
      html`<accordion-item heading="Test Heading">Content</accordion-item>`
    );
    expect(el.getAttribute('open')).toBeNull();
  });

  it('should toggle open state on button click', async () => {
    const el = await fixture<AccordionItem>(
      html`<accordion-item heading="Test Heading">Content</accordion-item>`
    );
    const button = el.shadowRoot?.querySelector('button');

    button?.click();
    await el.updateComplete;

    expect(el.getAttribute('open')).toBe('');
  });

  it('should dispatch toggle event', async () => {
    const el = await fixture<AccordionItem>(
      html`<accordion-item heading="Test Heading">Content</accordion-item>`
    );
    const button = el.shadowRoot?.querySelector('button');

    let eventFired = false;
    el.addEventListener('toggle', () => {
      eventFired = true;
    });

    button?.click();
    await el.updateComplete;

    expect(eventFired).toBe(true);
  });

  it('should display slot content', async () => {
    const el = await fixture<AccordionItem>(
      html`<accordion-item heading="Test Heading"><span>Slot Content</span></accordion-item>`
    );
    const text = el.textContent || '';
    expect(text).toContain('Slot Content');
  });

  it('should have proper ARIA attributes', async () => {
    const el = await fixture<AccordionItem>(
      html`<accordion-item heading="Test Heading">Content</accordion-item>`
    );
    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-expanded')).toBe('false');
  });

  it('should update aria-expanded on toggle', async () => {
    const el = await fixture<AccordionItem>(
      html`<accordion-item heading="Test Heading">Content</accordion-item>`
    );
    const button = el.shadowRoot?.querySelector('button');

    button?.click();
    await el.updateComplete;

    expect(button?.getAttribute('aria-expanded')).toBe('true');
  });
});
