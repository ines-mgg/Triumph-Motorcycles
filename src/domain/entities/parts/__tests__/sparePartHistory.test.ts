/// <reference types="jest" />
import { SparePart } from '../sparePart';
import { SparePartHistory, SparePartOrderRecord } from '../sparePartHistory';
import { DeliveryError, InvalidOrderError } from '../../../errors/parts';

describe('SparePartOrderRecord', () => {
  let orderRecord: SparePartOrderRecord;

  beforeEach(() => {
    orderRecord = new SparePartOrderRecord(
      'order-001',
      'sp-001',
      'Plaquette de frein',
      new Date(),
      100,
      50,
      5000,
      new Date(),
      0,
      100,
    );
  });

  test('updateDelivery doit mettre à jour la quantité livrée et la quantité restante', () => {
    orderRecord.updateDelivery(30);
    expect(orderRecord.deliveredQuantity).toBe(30);
    expect(orderRecord.remainingQuantity).toBe(70);
  });

  test('updateDelivery doit gérer correctement une livraison complète', () => {
    orderRecord.updateDelivery(100);
    expect(orderRecord.deliveredQuantity).toBe(100);
    expect(orderRecord.remainingQuantity).toBe(0);
  });

  test('updateDelivery doit lancer une erreur si la quantité livrée dépasse la quantité commandée', () => {
    orderRecord.updateDelivery(50);
    expect(() => {
      orderRecord.updateDelivery(60);
    }).toThrow(DeliveryError);
  });

  test('updateDelivery doit lancer une erreur si la quantité livrée dépasse la quantité commandée', () => {
    orderRecord.updateDelivery(50);
    expect(() => {
      orderRecord.updateDelivery(60);
    }).toThrow(DeliveryError);
  });
});

describe('SparePartHistory', () => {
  let sparePartHistory: SparePartHistory;
  let sparePart: SparePart;

  beforeEach(() => {
    sparePartHistory = new SparePartHistory();
    sparePart = new SparePart('sp-001', 'Plaquette de frein', 100, 10, 50);
  });

  test('addOrderRecord doit ajouter un enregistrement de commande', () => {
    sparePartHistory.addOrderRecord(
      'order-001',
      sparePart,
      100,
      50,
      new Date('2023-12-31'),
    );
    const records = sparePartHistory.getFullHistory();
    expect(records.length).toBe(1);
    expect(records[0].orderId).toBe('order-001');
  });

  test("updateOrderDelivery doit mettre à jour la livraison d'une commande", () => {
    sparePartHistory.addOrderRecord(
      'order-001',
      sparePart,
      100,
      50,
      new Date('2023-12-31'),
    );
    sparePartHistory.updateOrderDelivery('order-001', 30);
    const record = sparePartHistory.getFullHistory()[0];
    expect(record.deliveredQuantity).toBe(30);
    expect(record.remainingQuantity).toBe(70);
  });

  test("updateOrderDelivery doit lancer une erreur si l'enregistrement de commande n'existe pas", () => {
    expect(() => {
      sparePartHistory.updateOrderDelivery('nonexistent-order', 30);
    }).toThrow(InvalidOrderError);
  });

  test("getHistoryBySparePartId doit retourner les enregistrements d'une pièce spécifique", () => {
    sparePartHistory.addOrderRecord(
      'order-001',
      sparePart,
      100,
      50,
      new Date('2023-12-31'),
    );
    const records = sparePartHistory.getHistoryBySparePartId('sp-001');
    expect(records.length).toBe(1);
  });

  test('getHistoryByDateRange doit retourner les enregistrements dans la plage de dates spécifiée', () => {
    const dateInFuture = new Date(Date.now() + 86400000);
    sparePartHistory.addOrderRecord(
      'order-001',
      sparePart,
      100,
      50,
      dateInFuture,
    );
    const records = sparePartHistory.getHistoryByDateRange(
      new Date(),
      dateInFuture,
    );
    expect(records.length).toBe(1);
  });

  test('calculateTotalExpenditure doit calculer le coût total des commandes', () => {
    sparePartHistory.addOrderRecord(
      'order-001',
      sparePart,
      100,
      50,
      new Date(),
    );
    sparePartHistory.addOrderRecord(
      'order-002',
      sparePart,
      50,
      100,
      new Date(),
    );
    const totalExpenditure = sparePartHistory.calculateTotalExpenditure();
    expect(totalExpenditure).toBe(10000);
  });
});
