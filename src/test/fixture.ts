import { render, type TemplateResult } from 'lit';

export const fixture = async <T extends HTMLElement>(template: TemplateResult): Promise<T> => {
  const container = document.createElement('div');
  render(template, container);
  const element = container.firstElementChild as T | null;

  if (!element) {
    throw new Error('Fixture did not render an element.');
  }

  document.body.appendChild(container);

  const maybeUpdate = (element as { updateComplete?: Promise<unknown> }).updateComplete;
  if (maybeUpdate) {
    await maybeUpdate;
  }

  return element;
};

export const cleanupFixture = (element: Element) => {
  const container = element.parentElement;
  if (container?.parentElement === document.body) {
    container.remove();
    return;
  }

  element.remove();
};
