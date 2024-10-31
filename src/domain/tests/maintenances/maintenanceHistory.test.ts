/// <reference types="jest" />

import { MaintenanceHistory, MaintenanceRecord } from "../../entities/maintenances/maintenanceHistory";
import { SparePart } from "../../entities/parts/sparePart";
import { InvalidMaintenanceRecordError } from '../../errors/maintenances';

describe('Historique de maintenance', () => {
  let historique: MaintenanceHistory;
  let sparePart1: SparePart;
  let sparePart2: SparePart;

  beforeEach(() => {
    historique = new MaintenanceHistory();
    sparePart1 = new SparePart('part1', 'Oil Filter', 20, 5, 20);
    sparePart2 = new SparePart('part2', 'Brake Pads', 30, 5, 30);
  });

  describe('addMaintenanceRecord', () => {
    it("devrait ajouter un enregistrement de maintenance à l'historique", () => {
      const record = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );

      historique.addMaintenanceRecord(record);
      expect(historique.getFullHistory().length).toBe(1);
      expect(historique.getFullHistory()[0]).toEqual(record);
    });

    it("devrait lancer une erreur pour un enregistrement de maintenance invalide sans maintenanceId", () => {
      const invalidRecord = new MaintenanceRecord(
        '',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );

      expect(() => historique.addMaintenanceRecord(invalidRecord)).toThrow(InvalidMaintenanceRecordError);
    });

    it("devrait lancer une erreur pour un coût négatif", () => {
      const invalidRecord = new MaintenanceRecord(
        '3',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        -50,
        [sparePart1],
        'Check all systems',
        'manager123'
      );

      expect(() => historique.addMaintenanceRecord(invalidRecord)).toThrow(InvalidMaintenanceRecordError);
    });

    it("devrait lancer une erreur si partsUsed n'est pas un tableau", () => {
      const invalidRecord = new MaintenanceRecord(
        '4',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any,
        'Check all systems',
        'manager123'
      );

      expect(() => historique.addMaintenanceRecord(invalidRecord)).toThrow(InvalidMaintenanceRecordError);
    });
  });

  describe('getFullHistory', () => {
    it("devrait retourner tous les enregistrements de maintenance", () => {
      const record1 = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );
      const record2 = new MaintenanceRecord(
        '2',
        'moto2',
        'Corrective',
        new Date('2023-08-01'),
        4000,
        200,
        [sparePart2],
        'Replace parts',
        'manager456'
      );

      historique.addMaintenanceRecord(record1);
      historique.addMaintenanceRecord(record2);
      const history = historique.getFullHistory();

      expect(history.length).toBe(2);
      expect(history).toEqual(expect.arrayContaining([record1, record2]));
    });
  });

  describe('getHistoryByMotorcycle', () => {
    it("devrait retourner les enregistrements de maintenance pour une moto spécifique", () => {
      const record1 = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );
      const record2 = new MaintenanceRecord(
        '2',
        'moto1',
        'Corrective',
        new Date('2023-08-01'),
        4000,
        200,
        [sparePart2],
        'Replace parts',
        'manager456'
      );

      historique.addMaintenanceRecord(record1);
      historique.addMaintenanceRecord(record2);
      const motorcycleHistory = historique.getHistoryByMotorcycle('moto1');

      expect(motorcycleHistory.length).toBe(2);
      expect(motorcycleHistory).toEqual(expect.arrayContaining([record1, record2]));
    });

    it("devrait retourner un tableau vide si aucune maintenance n'est trouvée pour la moto", () => {
      const motorcycleHistory = historique.getHistoryByMotorcycle('moto2');
      expect(motorcycleHistory).toEqual([]);
    });
  });

  describe('getHistoryByDateRange', () => {
    it("devrait retourner les enregistrements de maintenance dans une plage de dates donnée", () => {
      const record1 = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );
      const record2 = new MaintenanceRecord(
        '2',
        'moto2',
        'Corrective',
        new Date('2023-08-01'),
        4000,
        200,
        [sparePart2],
        'Replace parts',
        'manager456'
      );

      historique.addMaintenanceRecord(record1);
      historique.addMaintenanceRecord(record2);
      const dateRangeHistory = historique.getHistoryByDateRange(
        new Date('2023-06-01'),
        new Date('2023-07-31')
      );

      expect(dateRangeHistory.length).toBe(1);
      expect(dateRangeHistory).toEqual([record1]);
    });
  });

  describe('getHistoryByType', () => {
    it("devrait retourner les enregistrements de maintenance par type", () => {
      const record1 = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );
      const record2 = new MaintenanceRecord(
        '2',
        'moto2',
        'Corrective',
        new Date('2023-08-01'),
        4000,
        200,
        [sparePart2],
        'Replace parts',
        'manager456'
      );

      historique.addMaintenanceRecord(record1);
      historique.addMaintenanceRecord(record2);
      const preventiveHistory = historique.getHistoryByType('Preventive');

      expect(preventiveHistory.length).toBe(1);
      expect(preventiveHistory).toEqual([record1]);
    });
  });

  describe('getHistoryByCostRange', () => {
    it("devrait retourner les enregistrements de maintenance dans une plage de coûts donnée", () => {
      const record1 = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );
      const record2 = new MaintenanceRecord(
        '2',
        'moto2',
        'Corrective',
        new Date('2023-08-01'),
        4000,
        200,
        [sparePart2],
        'Replace parts',
        'manager456'
      );

      historique.addMaintenanceRecord(record1);
      historique.addMaintenanceRecord(record2);
      const costRangeHistory = historique.getHistoryByCostRange(100, 175);

      expect(costRangeHistory.length).toBe(1);
      expect(costRangeHistory).toEqual([record1]);
    });
  });

  describe('getRecentHistory', () => {
    it("devrait retourner les derniers enregistrements de maintenance", () => {
      const record1 = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );
      const record2 = new MaintenanceRecord(
        '2',
        'moto2',
        'Corrective',
        new Date('2023-08-01'),
        4000,
        200,
        [sparePart2],
        'Replace parts',
        'manager456'
      );

      historique.addMaintenanceRecord(record1);
      historique.addMaintenanceRecord(record2);
      const recentHistory = historique.getRecentHistory(1);

      expect(recentHistory.length).toBe(1);
      expect(recentHistory).toEqual([record2]);
    });
  });

  describe('getTotalMaintenanceCost', () => {
    it("devrait retourner le coût total des enregistrements de maintenance", () => {
      const record1 = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );
      const record2 = new MaintenanceRecord(
        '2',
        'moto2',
        'Corrective',
        new Date('2023-08-01'),
        4000,
        200,
        [sparePart2],
        'Replace parts',
        'manager456'
      );

      historique.addMaintenanceRecord(record1);
      historique.addMaintenanceRecord(record2);
      const totalCost = historique.getTotalMaintenanceCost();

      expect(totalCost).toBe(350);
    });

    it("devrait retourner le coût total des enregistrements de maintenance pour une moto spécifique", () => {
      const record1 = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1],
        'Check all systems',
        'manager123'
      );
      const record2 = new MaintenanceRecord(
        '2',
        'moto1',
        'Corrective',
        new Date('2023-08-01'),
        4000,
        200,
        [sparePart2],
        'Replace parts',
        'manager456'
      );

      historique.addMaintenanceRecord(record1);
      historique.addMaintenanceRecord(record2);
      const totalCostForMotorcycle = historique.getTotalMaintenanceCost('moto1');

      expect(totalCostForMotorcycle).toBe(350);
    });
  });

  describe('getPartsUsageSummary', () => {
    it("devrait retourner un résumé de l'utilisation des pièces", () => {
      const record1 = new MaintenanceRecord(
        '1',
        'moto1',
        'Preventive',
        new Date('2023-07-01'),
        3000,
        150,
        [sparePart1, sparePart2],
        'Check all systems',
        'manager123'
      );
      const record2 = new MaintenanceRecord(
        '2',
        'moto2',
        'Corrective',
        new Date('2023-08-01'),
        4000,
        200,
        [sparePart1],
        'Replace parts',
        'manager456'
      );

      historique.addMaintenanceRecord(record1);
      historique.addMaintenanceRecord(record2);
      const partsUsage = historique.getPartsUsageSummary();

      expect(partsUsage).toEqual(
        expect.arrayContaining([
          { part: sparePart1, quantityUsed: 2 },
          { part: sparePart2, quantityUsed: 1 },
        ])
      );
    });
  });
});
