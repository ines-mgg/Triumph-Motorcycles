/// <reference types="jest" />

import { SparePart } from "../../entities/parts/sparePart";

describe('SparePart', () => {
  let sparePart: SparePart;

  beforeEach(() => {
    sparePart = new SparePart('sp-001', 'Plaquette de frein', 100, 10, 50);
  });

  test('restock doit augmenter la quantité en stock', () => {
    sparePart.restock(20);
    expect(sparePart.quantityInStock).toBe(120);
  });

  test('reserve doit réserver une quantité disponible', () => {
    expect(sparePart.reserve(30)).toBe(true);
    expect(sparePart.getReservedStock()).toBe(30);
  });

  test('reserve doit échouer si la quantité demandée dépasse le stock disponible', () => {
    sparePart.reserve(90); 
    expect(sparePart.reserve(20)).toBe(false); 
    expect(sparePart.getReservedStock()).toBe(90); 
  });

  test('releaseReserved doit libérer une quantité réservée', () => {
    sparePart.reserve(50);
    sparePart.releaseReserved(20);
    expect(sparePart.getReservedStock()).toBe(30);
  });

  test('isStockLow doit retourner vrai si le stock est inférieur au niveau critique', () => {
    sparePart.reserve(90);
    expect(sparePart.isStockLow()).toBe(true);
  });

  test('use doit diminuer la quantité en stock et augmenter l\'utilisation totale', () => {
    expect(sparePart.use(20)).toBe(true); 
    expect(sparePart.getTotalUsage()).toBe(20);
    expect(sparePart.quantityInStock).toBe(80);
  });

  test('use doit échouer si la quantité demandée dépasse le stock disponible', () => {
    sparePart.reserve(90);
    expect(sparePart.use(20)).toBe(false);
    expect(sparePart.quantityInStock).toBe(100); 
  });
});
