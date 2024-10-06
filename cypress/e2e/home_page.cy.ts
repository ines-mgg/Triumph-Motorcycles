/// <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit(Cypress.env('APP_BASE_URL'));
  });
});
