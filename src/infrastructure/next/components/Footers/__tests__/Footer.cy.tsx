/// <reference types="cypress" />
import { mount } from 'cypress/react18';
import Footer from '../Footer';

describe('(Component) Footer', () => {
  beforeEach(() => {
    mount((<Footer />) as React.ReactElement);
  });
  it('should have text', () => {
    cy.get('[data-cy=footer]').should('have.text', 'Test Footer');
  });
});
