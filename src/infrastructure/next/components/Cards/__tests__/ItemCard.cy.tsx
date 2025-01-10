/// <reference types="cypress" />
import { mount } from 'cypress/react18';
import ItemCard from '../ItemCard';

describe('(Component) ItemCard', () => {
  describe('Basic ItemCard', () => {
    it('should display title and content', () => {
      mount(
        (<ItemCard titleCard="Test Title" contentCard="Test Content" />) as React.ReactElement,
      );
      cy.get('.itemCardHeader').should('have.text', 'Test Title');
      cy.get('.body-2-regular').should('have.text', 'Test Content');
    });
  });

  describe('ItemCard with tags', () => {
    it('should display tags when hasTags is true', () => {
      const tags = ['Tag1', 'Tag2', 'Tag3'];
      mount(
        (<ItemCard titleCard="Test Title" contentCard="Test Content" hasTags tagsList={tags} />) as React.ReactElement,
      );
      cy.get('.tagsList').children().should('have.length', tags.length);
      tags.forEach((tag, index) => {
        cy.get('.tagsList').children().eq(index).should('have.text', tag);
      });
    });
  });

  describe('ItemCard without tags', () => {
    it('should not display tags when hasTags is false', () => {
      mount(
        (<ItemCard titleCard="Test Title" contentCard="Test Content" hasTags={false} />) as React.ReactElement,
      );
      cy.get('.tagsList').should('not.exist');
    });
  });
});