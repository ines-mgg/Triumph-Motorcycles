/// <reference types="jest" />

import { OrderItem } from "../../entities/parts/orderItem";
import { SparePart } from "../../entities/parts/sparePart";


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

  test('isFullyDelivered doit retourner vrai si toutes les unités sont livrées', () => {
    orderItem.updateDelivery(5);
    expect(orderItem.isFullyDelivered()).toBe(true);
  });

  test('getRemainingQuantity doit retourner la quantité restante à livrer', () => {
    orderItem.updateDelivery(2);
    expect(orderItem.getRemainingQuantity()).toBe(3);
  });
});
