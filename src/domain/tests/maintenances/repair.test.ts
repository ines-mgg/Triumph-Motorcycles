import { Repair } from "../../entities/maintenances/repair";


describe('Repair', () => {
  let repair: Repair;

  describe('constructeur', () => {
    it('devrait créer une instance de Repair avec des actions valides', () => {
      repair = new Repair(
        'repair123',
        'breakdown456',
        new Date('2023-10-29'),
        'Oil Change, Brake Replacement',
        150
      );

      expect(repair.id).toBe('repair123');
      expect(repair.breakdownId).toBe('breakdown456');
      expect(repair.repairDate).toEqual(new Date('2023-10-29'));
      expect(repair.actions).toBe('Oil Change, Brake Replacement');
      expect(repair.cost).toBe(150);
    });

    it('devrait lancer une erreur si des actions non reconnues sont fournies', () => {
      expect(() => {
        new Repair(
          'repair124',
          'breakdown457',
          new Date('2023-10-29'),
          'Invalid Action, Brake Replacement',
          100
        );
      }).toThrowError('Action "Invalid Action" is not a recognized repair action.');
    });

    it('devrait lancer une erreur si une action non reconnue est fournie', () => {
      expect(() => {
        new Repair(
          'repair125',
          'breakdown458',
          new Date('2023-10-29'),
          'Tire Replacement, Unknown Action',
          200
        );
      }).toThrowError('Action "Unknown Action" is not a recognized repair action.');
    });
  });

  describe('validateActions', () => {
    it('devrait valider les actions valides sans erreur', () => {
      expect(() => {
        repair = new Repair(
          'repair126',
          'breakdown459',
          new Date('2023-10-29'),
          'Oil Change, Tire Replacement',
          250
        );
      }).not.toThrow();
    });

    it('devrait lancer une erreur si des actions invalides sont détectées', () => {
      expect(() => {
        repair = new Repair(
          'repair127',
          'breakdown460',
          new Date('2023-10-29'),
          'Clutch Adjustment, Invalid Action',
          300
        );
      }).toThrowError('Action "Invalid Action" is not a recognized repair action.');
    });
  });
});
