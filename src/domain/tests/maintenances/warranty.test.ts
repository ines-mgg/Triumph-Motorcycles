/// <reference types="jest" />

import { Warranty } from "../../entities/maintenances/warranty";
import { InvalidWarrantyError } from "../../errors/maintenances";

describe('Garantie', () => {
  let garantie: Warranty;

  beforeEach(() => {
    garantie = new Warranty(
      'warranty1',
      'moto1',
      new Date('2023-01-01'),
      new Date('2024-01-01'),
      'Couverture complète des réparations',
      true
    );
  });

  describe('Constructor', () => {
    it('devrait créer une garantie valide', () => {
      expect(garantie.id).toBe('warranty1');
      expect(garantie.motorcycleId).toBe('moto1');
      expect(garantie.startDate).toEqual(new Date('2023-01-01'));
      expect(garantie.endDate).toEqual(new Date('2024-01-01'));
      expect(garantie.coverageDetails).toBe('Couverture complète des réparations');
      expect(garantie.isActive).toBe(true);
    });

    it("devrait lancer une erreur si l'identifiant de la garantie est vide", () => {
      expect(() => {
        new Warranty('', 'moto1', new Date('2023-01-01'), new Date('2024-01-01'), 'Couverture', true);
      }).toThrow(InvalidWarrantyError);
    });

    it("devrait lancer une erreur si l'identifiant de la motocyclette est vide", () => {
      expect(() => {
        new Warranty('warranty1', '', new Date('2023-01-01'), new Date('2024-01-01'), 'Couverture', true);
      }).toThrow(InvalidWarrantyError);
    });

    it('devrait lancer une erreur si la date de début est postérieure à la date de fin', () => {
      expect(() => {
        new Warranty('warranty1', 'moto1', new Date('2024-01-02'), new Date('2024-01-01'), 'Couverture', true);
      }).toThrow(InvalidWarrantyError);
    });

    it('devrait lancer une erreur si la date de début est invalide', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new Warranty('warranty1', 'moto1', <any>'invalid date', new Date('2024-01-01'), 'Couverture', true);
      }).toThrow(InvalidWarrantyError);
    });

    it('devrait lancer une erreur si la date de fin est invalide', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new Warranty('warranty1', 'moto1', new Date('2023-01-01'), <any>'invalid date', 'Couverture', true);
      }).toThrow(InvalidWarrantyError);
    });
  });

  describe('isWarrantyValid', () => {
    it("devrait retourner vrai si la date de vérification est dans la période de garantie et que la garantie est active", () => {
      const dateValide = new Date('2023-06-01');
      expect(garantie.isWarrantyValid(dateValide)).toBe(true);
    });

    it("devrait retourner faux si la date de vérification est avant la date de début de garantie", () => {
      const dateAvantGarantie = new Date('2022-12-31');
      expect(garantie.isWarrantyValid(dateAvantGarantie)).toBe(false);
    });

    it("devrait retourner faux si la date de vérification est après la date de fin de garantie", () => {
      const dateApresGarantie = new Date('2024-01-02');
      expect(garantie.isWarrantyValid(dateApresGarantie)).toBe(false);
    });

    it("devrait retourner faux si la garantie n'est pas active", () => {
      garantie.isActive = false;
      const datePendantGarantie = new Date('2023-06-01');
      expect(garantie.isWarrantyValid(datePendantGarantie)).toBe(false);
    });
  });

  describe('isRepairCovered', () => {
    it("devrait retourner vrai si la date de réparation est couverte par la garantie", () => {
      const dateReparation = new Date('2023-06-01');
      expect(garantie.isRepairCovered(dateReparation)).toBe(true);
    });

    it("devrait retourner faux si la date de réparation est en dehors de la période de garantie", () => {
      const dateReparation = new Date('2024-02-01');
      expect(garantie.isRepairCovered(dateReparation)).toBe(false);
    });

    it("devrait retourner faux si la garantie n'est pas active", () => {
      garantie.isActive = false;
      const dateReparation = new Date('2023-06-01');
      expect(garantie.isRepairCovered(dateReparation)).toBe(false);
    });
  });
});
