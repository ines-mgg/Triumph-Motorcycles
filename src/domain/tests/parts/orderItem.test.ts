/// <reference types="jest" />

import { OrderItem } from "../../entities/parts/orderItem";
import { SparePart } from "../../entities/parts/sparePart";
import { InvalidOrderError } from "../../errors/parts";


describe('OrderItem', () => {
  let sparePart: SparePart;
  let orderItem: OrderItem;

  beforeEach(() => {
    sparePart = new SparePart('sp-001', 'Plaquette de frein', 100, 10, 50);
    orderItem = new OrderItem(sparePart, 5, 20); 
  });

  test('getTotalCost doit retourner le coût total pour l\'article', () => {
    expect(orderItem.getTotalCost()).toBe(100); 
  });

  test('updateDelivery doit mettre à jour la quantité livrée', () => {
    orderItem.updateDelivery(3); 
    expect(orderItem.getDeliveredQty()).toBe(3);
    
    orderItem.updateDelivery(2); 
    expect(orderItem.getDeliveredQty()).toBe(5); 
  });

  test('updateDelivery doit lancer une InvalidOrderError si la quantité livrée est négative', () => {
    expect(() => {
      orderItem.updateDelivery(-1);
    }).toThrow(InvalidOrderError);
    expect(() => {
      orderItem.updateDelivery(-1);
    }).toThrow("La quantité livrée ne peut pas être négative.");
  });

  test('isFullyDelivered doit retourner vrai si toutes les unités sont livrées', () => {
    orderItem.updateDelivery(5);
    expect(orderItem.isFullyDelivered()).toBe(true);
  });

  test('getRemainingQuantity doit retourner la quantité restante à livrer', () => {
    orderItem.updateDelivery(2);
    expect(orderItem.getRemainingQuantity()).toBe(3);
  });

  test('doit lancer InvalidOrderError si la pièce de rechange est nulle', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new OrderItem(null as any, 5, 20);
    }).toThrow(InvalidOrderError);
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new OrderItem(null as any, 5, 20);
    }).toThrow("La pièce de rechange ne peut pas être nulle.");
  });

  test('doit lancer InvalidOrderError si la quantité commandée est inférieure ou égale à zéro', () => {
    expect(() => {
      new OrderItem(sparePart, 0, 20);
    }).toThrow(InvalidOrderError);
    expect(() => {
      new OrderItem(sparePart, 0, 20);
    }).toThrow("La quantité commandée doit être un nombre positif.");
  });

  test('doit lancer InvalidOrderError si le coût par unité est inférieur ou égal à zéro', () => {
    expect(() => {
      new OrderItem(sparePart, 5, 0);
    }).toThrow(InvalidOrderError);
    expect(() => {
      new OrderItem(sparePart, 5, 0);
    }).toThrow("Le coût par unité doit être un nombre positif.");
  });
});
