/// <reference types="jest" />

import { Repair } from '../../entities/maintenances/repair';
import {InvalidRepairActionError } from '../../errors/maintenances';

describe('Réparation', () => {
  it('devrait créer une instance de réparation valide', () => {
    const repair = new Repair('1', 'breakdown1', new Date(), 'Oil Change, Brake Replacement', 150);
    expect(repair.id).toBe('1');
    expect(repair.breakdownId).toBe('breakdown1');
    expect(repair.repairDate).toBeInstanceOf(Date);
    expect(repair.actions).toBe('Oil Change, Brake Replacement');
    expect(repair.cost).toBe(150);
  });

  it('devrait lancer une erreur pour des actions de réparation invalides', () => {
    expect(() => {
      new Repair('1', 'breakdown1', new Date(), 'Action invalide', 100);
    }).toThrow(InvalidRepairActionError);
    expect(() => {
      new Repair('2', 'breakdown2', new Date(), 'Oil Change, Action invalide', 200);
    }).toThrow(InvalidRepairActionError);
  });

  it('ne devrait pas lancer d\'erreur pour des actions de réparation valides', () => {
    expect(() => {
      new Repair('3', 'breakdown3', new Date(), 'Tire Replacement', 250);
    }).not.toThrow();
    
    expect(() => {
      new Repair('4', 'breakdown4', new Date(), 'Battery Replacement, Clutch Adjustment', 300);
    }).not.toThrow();
  });
});
