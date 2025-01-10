/// <reference types="cypress" />
import { mount } from 'cypress/react18';
import Chip from '../Chip';

describe('(Component) Chip', () => {
    describe('Small chip', () => {
        it('should have label and basic css classes', () => {
            mount(
                (<Chip label="label" ariaLabel="ariaLabel"/>) as React.ReactElement
            )
            cy.get('[data-cy=chip]').should('have.text', 'label');
            cy.get('[data-cy=chip]').should('have.attr', 'aria-label', 'ariaLabel');
            cy.get('[data-cy=chip]').should('have.class', 'chip small caption-bold');
        });
    });
    describe('Large chip', () => {
        it('should have label and basic css classes', () => {
            mount(
                (<Chip label="label" ariaLabel="ariaLabel" isLarge/>) as React.ReactElement
            )
            cy.get('[data-cy=chip]').should('have.text', 'label');
            cy.get('[data-cy=chip]').should('have.attr', 'aria-label', 'ariaLabel');
            cy.get('[data-cy=chip]').should('have.class', 'chip large body-1-bold');
        }); 
    })
})