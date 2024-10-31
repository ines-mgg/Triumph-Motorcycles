/// <reference types="jest" />

import { SparePart } from "../../entities/parts/sparePart";
import { SparePartNotification } from "../../entities/parts/sparePartNotification";


describe('SparePartNotification', () => {
  let sparePart1: SparePart;
  let sparePart2: SparePart;
  let sparePartNotification: SparePartNotification;

  beforeEach(() => {
    sparePart1 = new SparePart('sp-001', 'Plaquette de frein', 5, 10, 50);
    sparePart2 = new SparePart('sp-002', 'Huile moteur', 20, 5, 30); 
    sparePartNotification = new SparePartNotification([sparePart1, sparePart2]);
  });

  test('checkStockLevels doit générer une notification pour les pièces en stock faible', () => {
    sparePartNotification.checkStockLevels();
    const notifications = sparePartNotification.getNotifications();
    expect(notifications.length).toBe(1);
    expect(notifications[0]).toBe(
      `Low stock alert: The spare part "${sparePart1.name}" (ID: ${sparePart1.id}) is below the critical level. Current stock: ${sparePart1.quantityInStock}.`
    );
  });

  test('checkStockLevels ne doit pas générer de notification pour les pièces avec un stock suffisant', () => {
    sparePartNotification.checkStockLevels();
    const notifications = sparePartNotification.getNotifications();
    expect(notifications).not.toContain(
      `Low stock alert: The spare part "${sparePart2.name}" (ID: ${sparePart2.id}) is below the critical level. Current stock: ${sparePart2.quantityInStock}.`
    );
  });

  test('clearNotifications doit vider les notifications', () => {
    sparePartNotification.checkStockLevels();
    expect(sparePartNotification.getNotifications().length).toBe(1);
    sparePartNotification.clearNotifications();
    expect(sparePartNotification.getNotifications().length).toBe(0);
  });

  test('addNotification ne doit pas ajouter de notifications en double', () => {
    sparePartNotification.checkStockLevels();
    sparePartNotification.checkStockLevels();
    const notifications = sparePartNotification.getNotifications();
    expect(notifications.length).toBe(1);
  });
});
