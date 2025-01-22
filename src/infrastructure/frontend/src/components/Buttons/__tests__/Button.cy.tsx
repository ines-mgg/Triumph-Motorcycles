/// <reference types="cypress" />
import { mount } from 'cypress/react18';
import Button from '../Button';

describe('(Component) Button', () => {
  beforeEach(() => {
    mount(
      (<Button label="label" ariaLabel="ariaLabel" />) as React.ReactElement,
    );
  });
  it('should have all props', () => {
    cy.get('[data-cy=button]').should('have.text', 'label');
    cy.get('[data-cy=button]').should('have.attr', 'aria-label', 'ariaLabel');
  });
  it('should have .button css class', () => {
    cy.get('[data-cy=button]').should('have.class', 'button');
  });
});
