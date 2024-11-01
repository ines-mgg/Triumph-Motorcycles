/// <reference types="jest" />

 
import { Motorcycle } from '../../drives/motorcycle';
import { Maintenance } from '../maintenance';
import {
  MissingMotorcycleError,
  InvalidMaintenanceIntervalError,
} from '../../../errors/maintenances';

describe('Maintenance', () => {
  let motorcycle: Motorcycle;
  let maintenance: Maintenance;

  beforeEach(() => {
    motorcycle = new Motorcycle(
      'moto-123',
      'Yamaha R1',
      10000,
      'Available',
      new Date('2022-01-01'),
      new Date('2023-01-01'),
      15000,
      'mgr-456',
    );

    maintenance = new Maintenance('1', motorcycle, 5000, 180);
  });

  describe('Constructor', () => {
    test('doit lever une erreur si la moto est manquante', () => {
      expect(() => {
        new Maintenance('1', null as any, 5000, 180);
      }).toThrow(MissingMotorcycleError);
    });

    test("doit lever une erreur si l'intervalle de maintenance en kilométrage est négatif", () => {
      expect(() => {
        new Maintenance('1', motorcycle, -5000, 180);
      }).toThrow(InvalidMaintenanceIntervalError);
    });

    test("doit lever une erreur si l'intervalle de maintenance en temps est négatif", () => {
      expect(() => {
        new Maintenance('1', motorcycle, 5000, -180);
      }).toThrow(InvalidMaintenanceIntervalError);
    });
  });

  test('scheduleNextMaintenance doit calculer correctement le prochain kilométrage et la date de maintenance', () => {
    const expectedNextMileage = 15000;
    const expectedNextServiceDate = new Date('2023-06-29');

    maintenance.scheduleNextMaintenance();

    expect(motorcycle.nextServiceMileage).toBe(expectedNextMileage);

    const receivedDate = motorcycle.lastServiceDate;

    expect(receivedDate?.toISOString().split('T')[0]).toEqual(
      expectedNextServiceDate.toISOString().split('T')[0],
    );
  });

  test("needsMaintenance doit retourner vrai si le kilométrage ou l'intervalle de temps nécessite une maintenance", () => {
    motorcycle.lastServiceDate = new Date(
      Date.now() - 181 * 24 * 60 * 60 * 1000,
    );
    expect(maintenance.needsMaintenance()).toBe(true);

    motorcycle.lastServiceDate = new Date(
      Date.now() - 170 * 24 * 60 * 60 * 1000,
    );
    expect(maintenance.needsMaintenance()).toBe(false);
  });

  test("needsMaintenance doit retourner faux si aucune date de dernier service n'est disponible et qu'aucune maintenance n'est requise", () => {
    motorcycle.lastServiceDate = null;
    expect(maintenance.needsMaintenance()).toBe(false);
  });
});
