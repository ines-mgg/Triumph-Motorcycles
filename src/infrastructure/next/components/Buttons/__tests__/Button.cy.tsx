/// <reference types="cypress" />
import { mount } from 'cypress/react18';
import Button from '../Button';

describe('(Component) Button', () => {
  describe('Basic button', () => {
    it('should have label, aria-label and basic css classes', () => {
      mount(
        (<Button label="label" ariaLabel="ariaLabel" />) as React.ReactElement,
      );
      cy.get('[data-cy=button]').should('have.text', 'label');
      cy.get('[data-cy=button]').should('have.attr', 'aria-label', 'ariaLabel');
      cy.get('[data-cy=button]').should('have.class', 'button cta-medium');
    });
  });
  describe('Disabled button', () => {
    it('should have label, aria-label, basic css classes and disabled attribut and css class', () => {
      mount(
        (<Button label="label" ariaLabel="ariaLabel" isDisabled/>) as React.ReactElement,
      );
      cy.get('[data-cy=button]').should('have.text', 'label');
      cy.get('[data-cy=button]').should('have.attr', 'aria-label', 'ariaLabel');
      cy.get('[data-cy=button]').should('have.attr', 'aria-disabled', 'true');
      cy.get('[data-cy=button]').should('have.class', 'button cta-medium disabled');
    });
  });
});
