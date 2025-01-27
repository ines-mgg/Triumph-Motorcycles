import { MaintenanceRecord } from '@triumph-motorcycles/domain/types';
import { SparePartEntity } from '../../parts/SparePartEntity';
import { MaintenanceHistoryEntity } from '../MaintenanceHistoryEntity';
import { InvalidMaintenanceRecordError } from '@triumph-motorcycles/domain/errors';

describe('MaintenanceHistoryEntity', () => {
  let maintenanceHistory: MaintenanceHistoryEntity;
  let sparePart1: SparePartEntity;
  let sparePart2: SparePartEntity;

  beforeEach(() => {
    maintenanceHistory = new MaintenanceHistoryEntity();

    sparePart1 = SparePartEntity.create(
      'Brake Pad',
      50,
      10,
      30,
    ) as SparePartEntity;
    sparePart2 = SparePartEntity.create(
      'Oil Filter',
      30,
      5,
      15,
    ) as SparePartEntity;
  });

  describe('addMaintenanceRecord', () => {
    it('should add a valid maintenance record', () => {
      const record: MaintenanceRecord = {
        maintenanceId: '1',
        motorcycleId: 'moto1',
        date: new Date(),
        cost: 100,
        maintenanceType: 'Preventive',
        partsUsed: [sparePart1, sparePart2],
        mileageAtService: 0,
        technicianRecommendation: '',
        managerId: '',
      };

      maintenanceHistory.addMaintenanceRecord(record);
      expect(maintenanceHistory.getFullHistory().length).toBe(1);
      expect(maintenanceHistory.getFullHistory()[0]).toEqual(record);
    });

    it('should throw an error when maintenanceId is missing', () => {
      const invalidRecord = {
        motorcycleId: 'moto1',
        date: new Date(),
        cost: 100,
        maintenanceType: 'Preventive',
        partsUsed: [sparePart1],
      } as MaintenanceRecord;

      expect(() =>
        maintenanceHistory.addMaintenanceRecord(invalidRecord),
      ).toThrow(
        new InvalidMaintenanceRecordError(
          'Maintenance ID and Motorcycle ID are required.',
        ),
      );
    });

    it('should throw an error when motorcycleId is missing', () => {
      const invalidRecord = {
        maintenanceId: '1',
        date: new Date(),
        cost: 100,
        maintenanceType: 'Preventive',
        partsUsed: [sparePart1],
      } as MaintenanceRecord;

      expect(() =>
        maintenanceHistory.addMaintenanceRecord(invalidRecord),
      ).toThrow(
        new InvalidMaintenanceRecordError(
          'Maintenance ID and Motorcycle ID are required.',
        ),
      );
    });

    it('should throw an error when cost is negative', () => {
      const invalidRecord = {
        maintenanceId: '1',
        motorcycleId: 'moto1',
        date: new Date(),
        cost: -100,
        maintenanceType: 'Preventive',
        partsUsed: [sparePart1],
      } as MaintenanceRecord;

      expect(() =>
        maintenanceHistory.addMaintenanceRecord(invalidRecord),
      ).toThrow(new InvalidMaintenanceRecordError('Cost cannot be negative.'));
    });

    it('should throw an error when partsUsed is not an array', () => {
      const invalidRecord = {
        maintenanceId: '1',
        motorcycleId: 'moto1',
        date: new Date(),
        cost: 100,
        maintenanceType: 'Preventive',
        partsUsed: null,
      } as unknown as MaintenanceRecord;

      expect(() =>
        maintenanceHistory.addMaintenanceRecord(invalidRecord),
      ).toThrow(
        new InvalidMaintenanceRecordError('Parts used must be an array.'),
      );
    });
  });
});
