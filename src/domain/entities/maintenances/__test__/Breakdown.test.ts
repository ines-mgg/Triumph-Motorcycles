import {
  BreakdownDescriptionError,
  BreakdownInvalidWarrantyError,
  BreakdownReportedDateError,
} from '@triumph-motorcycles/domain/errors';
import { BreakdownEntity } from '../BreakdownEntity';
import { CommonRepairAction } from '@triumph-motorcycles/domain/types';
import { RepairEntity } from '../RepairEntity';
import { WarrantyEntity } from '../WarrantyEntity';
import { motorcycle } from '../../../../tests/testUtils';

describe('BreakdownEntity', () => {
  describe('create', () => {
    it('should create a valid BreakdownEntity', () => {
      const description = 'Engine failure';
      const reportedDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
      const warranty = null;

      const breakdown = BreakdownEntity.create(
        motorcycle,
        description,
        reportedDate,
        warranty,
      );

      expect(breakdown).toBeInstanceOf(BreakdownEntity);
      if (breakdown instanceof BreakdownEntity) {
        expect(breakdown.motorcycle).toBe(motorcycle);
        expect(breakdown.description.value).toBe(description);
        expect(breakdown.reportedDate.value).toEqual(reportedDate);
        expect(breakdown.warranty).toBeNull();
      }
    });

    it('should return BreakdownDescriptionError if description is invalid', () => {
      const invalidDescription = '1234';
      const reportedDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
      const warranty = null;

      const result = BreakdownEntity.create(
        motorcycle,
        invalidDescription,
        reportedDate,
        warranty,
      );

      expect(result).toBeInstanceOf(BreakdownDescriptionError);
    });

    it('should return BreakdownReportedDateError if reported date is in the future', () => {
      const description = 'Engine failure';
      const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const warranty = null;

      const result = BreakdownEntity.create(
        motorcycle,
        description,
        futureDate,
        warranty,
      );

      expect(result).toBeInstanceOf(BreakdownReportedDateError);
    });
  });

  describe('addRepair', () => {
    it('should add a repair record to the repair history', () => {
      const breakdown = BreakdownEntity.create(
        motorcycle,
        'Flat tire',
        new Date(Date.now() - 1000 * 60 * 60 * 24),
        null,
      ) as BreakdownEntity;

      const repairDate = new Date();
      repairDate.setDate(repairDate.getDate() + 14);

      const actions: CommonRepairAction[] = ['Oil Change'];
      const cost = 150;

      const repair = RepairEntity.create(breakdown, repairDate, actions, cost);

      expect(repair).toBeInstanceOf(RepairEntity);
      if (repair instanceof RepairEntity) {
        breakdown.addRepair(repair);

        const repairHistory = breakdown.getRepairHistory();
        expect(repairHistory).toContain(repair);
        expect(motorcycle.status).toBe('InMaintenance');
      }
    });
  });

  describe('isCoveredByWarranty', () => {
    it('should return true if the breakdown is covered by the warranty', () => {
      const warrantyEndDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
      const warranty = WarrantyEntity.create(
        motorcycle,
        new Date(Date.now() - 1000 * 60 * 60 * 24),
        warrantyEndDate,
        'Full coverage',
        true,
      ) as WarrantyEntity;

      const breakdown = BreakdownEntity.create(
        motorcycle,
        'Electrical issue',
        new Date(Date.now() - 1000 * 60 * 60 * 24),
        warranty,
      ) as BreakdownEntity;

      const checkDate = new Date();

      expect(warranty).toBeInstanceOf(WarrantyEntity);

      expect(breakdown.isCoveredByWarranty(checkDate)).toBe(true);
    });

    it('should return false if the breakdown is not covered by the warranty', () => {
      const warrantyEndDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
      const warranty = WarrantyEntity.create(
        motorcycle,
        new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        warrantyEndDate,
        'Full coverage',
        true,
      ) as WarrantyEntity;

      const breakdown = BreakdownEntity.create(
        motorcycle,
        'Brake failure',
        new Date(Date.now() - 1000 * 60 * 60 * 24),
        warranty,
      ) as BreakdownEntity;

      expect(breakdown).toBeInstanceOf(BreakdownEntity);
    });

    it('should throw BreakdownInvalidWarrantyError if warranty is null', () => {
      const breakdown = BreakdownEntity.create(
        motorcycle,
        'Exhaust leak',
        new Date(Date.now() - 1000 * 60 * 60 * 24),
        null,
      ) as BreakdownEntity;

      expect(() => breakdown.isCoveredByWarranty(new Date())).toThrow(
        BreakdownInvalidWarrantyError,
      );
    });
  });
});
