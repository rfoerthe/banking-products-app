import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-accordion')
export class Accordion extends LitElement {
  @property({ type: Boolean, reflect: true }) allowMultiple: boolean = false;

  static styles = css`
    :host {
      display: block;
    }

    .accordion {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      overflow: hidden;
    }
  `;

  render() {
    return html`
      <div class="accordion" role="region" aria-label="Accordion">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('toggle', this.handleToggle);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('toggle', this.handleToggle);
  }

  private handleToggle = (event: Event) => {
    if (!this.allowMultiple) {
      const target = event.target as HTMLElement;
      const items = Array.from(this.children).filter(
        (child) => child.tagName.toLowerCase() === 'accordion-item'
      ) as HTMLElement[];

      items.forEach((item) => {
        if (item !== target && item.hasAttribute('open')) {
          item.removeAttribute('open');
        }
      });
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'app-accordion': Accordion;
  }
}
