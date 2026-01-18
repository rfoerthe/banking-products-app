import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('accordion-item')
export class AccordionItem extends LitElement {
  @property({ type: String }) heading: string = '';
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  static styles = css`
    :host {
      display: block;
    }

    .accordion-item {
      border-bottom: 1px solid #e5e7eb;
    }

    .accordion-header {
      width: 100%;
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #111827;
      background-color: #f3f4f6;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: none;
      transition: background-color 0.15s;
      font-size: 1rem;
    }

    .accordion-header:hover {
      background-color: #e5e7eb;
    }

    .accordion-header:focus {
      outline: none;
      box-shadow: inset 0 0 0 2px #3b82f6;
    }

    .accordion-icon {
      width: 1.25rem;
      height: 1.25rem;
      transition: transform 0.2s;
      flex-shrink: 0;
    }

    .accordion-icon.open {
      transform: rotate(180deg);
    }

    .accordion-content {
      overflow: hidden;
      transition: max-height 0.2s ease-in-out;
      max-height: 0;
    }

    .accordion-content.open {
      max-height: 1000px;
    }

    .accordion-body {
      padding: 0.75rem 1rem;
      background-color: #ffffff;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
  }

  render() {
    return html`
      <div class="accordion-item">
        <button
          class="accordion-header"
          @click=${this.toggle}
          aria-expanded=${this.open}
          aria-controls="accordion-content-${this.heading}"
        >
          <span>${this.heading}</span>
          <svg
            class="accordion-icon ${this.open ? 'open' : ''}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>

        <div
          class="accordion-content ${this.open ? 'open' : ''}"
          id="accordion-content-${this.heading}"
        >
          <div class="accordion-body">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  private toggle() {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'accordion-item': AccordionItem;
  }
}
