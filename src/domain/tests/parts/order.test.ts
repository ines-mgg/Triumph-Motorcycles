/// <reference types="jest" />

import { Order } from "../../entities/parts/order";
import { SparePart } from "../../entities/parts/sparePart";


describe('Order', () => {
  let order: Order;
  let sparePart1: SparePart;
  let sparePart2: SparePart;

  beforeEach(() => {
    order = new Order('order-123', new Date('2023-01-01'), new Date('2023-01-15'));

    sparePart1 = new SparePart('sp-001', 'Plaquette de frein', 100, 10, 50);
    sparePart2 = new SparePart('sp-002', 'Filtre à huile', 200, 20, 30);
  });

  test("addItem doit correctement ajouter des articles et mettre à jour le coût total", () => {
    order.addItem(sparePart1, 2, 50);
    order.addItem(sparePart2, 3, 30);

    const expectedTotalCost = (2 * 50) + (3 * 30); 

    expect(order.getItems()).toHaveLength(2);
    expect(order.getTotalCost()).toBe(expectedTotalCost);
  });

  test("updateItemDelivery doit mettre à jour la quantité livrée pour un article spécifique", () => {
    order.addItem(sparePart1, 5, 20);
    order.updateItemDelivery('sp-001', 3);

    const item = order.getItems().find((item) => item.sparePart.id === 'sp-001');
    expect(item?.getDeliveredQty()).toBe(3);
  });

  test("isOrderFullyDelivered doit retourner vrai si tous les articles sont entièrement livrés", () => {
    order.addItem(sparePart1, 2, 50);
    order.addItem(sparePart2, 3, 30);

    order.updateItemDelivery('sp-001', 2);
    order.updateItemDelivery('sp-002', 3);

    expect(order.isOrderFullyDelivered()).toBe(true);
  });

  test("isOrderFullyDelivered doit retourner faux si tous les articles ne sont pas entièrement livrés", () => {
    order.addItem(sparePart1, 2, 50);
    order.addItem(sparePart2, 3, 30);

    order.updateItemDelivery('sp-001', 2);
    order.updateItemDelivery('sp-002', 1); 

    expect(order.isOrderFullyDelivered()).toBe(false);
  });

  test("getUndeliveredItems doit retourner uniquement les articles qui ne sont pas entièrement livrés", () => {
    order.addItem(sparePart1, 2, 50);
    order.addItem(sparePart2, 3, 30);

    order.updateItemDelivery('sp-001', 2); 
    order.updateItemDelivery('sp-002', 1); 

    const undeliveredItems = order.getUndeliveredItems();

    expect(undeliveredItems).toHaveLength(1);
    expect(undeliveredItems[0].sparePart.id).toBe('sp-002');
  });

  test("getOrderDate et getEstimatedDeliveryDate doivent retourner les bonnes dates", () => {
    expect(order.getOrderDate()).toEqual(new Date('2023-01-01'));
    expect(order.getEstimatedDeliveryDate()).toEqual(new Date('2023-01-15'));
  });
});
