/// <reference types="jest" />

import { Motorcycle } from "../../entities/drives/motorcycle";
import { Breakdown } from "../../entities/maintenances/breakdown";
import { Warranty } from "../../entities/maintenances/warranty";

describe('Breakdown', () => {
  let moto: Motorcycle;
  let garantie: Warranty;
  let panne: Breakdown;

  beforeEach(() => {
    moto = new Motorcycle(
      '1',
      'Yamaha MT-09',
      1000,
      'Available',
      new Date('2023-01-01'),
      new Date('2023-06-01'),
      5000,
      'manager123'
    );

    garantie = new Warranty(
      'warranty1',
      moto.id,
      new Date('2023-01-01'),
      new Date('2024-01-01'),
      'Full coverage',
      true
    );

    panne = new Breakdown(
      'breakdown1',
      moto,
      'Engine issue',
      new Date('2023-07-01'),
      garantie
    );
  });

  describe('addRepair', () => {
    it("should add a repair record to the repair history", () => {
      panne.addRepair('Bodywork Repair', new Date('2023-07-02'), 300);
      const historique = panne.getRepairHistory();

      expect(historique.length).toBe(1);
      expect(historique[0]).toEqual(expect.objectContaining({
        breakdownId: 'breakdown1',
        actions: 'Bodywork Repair',
        cost: 300
      }));
    });

    it("should change the motorcycle status to 'Available' after repair", () => {
      panne.addRepair('Engine Repair', new Date('2023-07-02'), 300);
      expect(moto.status).toBe('Available');
    });
  });

  describe('getRepairHistory', () => {
    it("should return the repair history for the breakdown", () => {
      panne.addRepair('Engine Repair', new Date('2023-07-02'), 300); 
      panne.addRepair('Battery Replacement', new Date('2023-07-03'), 150); 
      const historique = panne.getRepairHistory();

      expect(historique.length).toBe(2);
      expect(historique[0].actions).toBe('Engine Repair'); 
      expect(historique[1].actions).toBe('Battery Replacement'); 
    });
  });

  describe('isCoveredByWarranty', () => {
    it("should return true if the checked date is covered by the warranty", () => {
      const dateCouverte = new Date('2023-07-02');
      expect(panne.isCoveredByWarranty(dateCouverte)).toBe(true);
    });

    it("should return false if the checked date is not covered by the warranty", () => {
      const dateNonCouverte = new Date('2024-02-01');
      expect(panne.isCoveredByWarranty(dateNonCouverte)).toBe(false);
    });

    it("should return false if the warranty is null", () => {
      panne = new Breakdown(
        'breakdown2',
        moto,
        'Clutch issue',
        new Date('2023-07-01'),
        null
      );

      const dateCouverte = new Date('2023-07-02');
      expect(panne.isCoveredByWarranty(dateCouverte)).toBe(false);
    });
  });
});
