/// <reference types="cypress" />
import { mount } from 'cypress/react18';
import Header from '../Header';

describe('(Component) Footer', () => {
  beforeEach(() => {
    mount((<Header />) as React.ReactElement);
  });
  it('should have text', () => {
    cy.get('[data-cy=header]').should('have.text', 'Test Header');
  });
});
