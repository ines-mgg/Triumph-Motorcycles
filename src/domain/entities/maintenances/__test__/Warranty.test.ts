import { MotorcycleEntity } from "../../drives";
import { WarrantyEntity } from "../WarrantyEntity";
import { WarrantyStartDateError } from "../../../errors/warranty/WarrantyStartDateError";
import { WarrantyEndDateError } from "../../../errors/warranty/WarrantyEndDateError";
import { WarrantyCoverageDetailsError } from "../../../errors/warranty/WarrantyCoverageDetailsError";

describe('WarrantyEntity', () => {
  let motorcycle: MotorcycleEntity;
  let startDate: Date;
  let endDate: Date;
  let coverageDetails: string;

  beforeEach(() => {
    motorcycle = MotorcycleEntity.create("Yamaha", "R1", 2023, new Date(), "Available") as MotorcycleEntity;
    startDate = new Date();
    endDate = new Date("2025-02-01");
    coverageDetails = "Engine and transmission coverage";
  });

  describe('create', () => {
    it('should successfully create a WarrantyEntity with valid inputs', () => {
      const warranty = WarrantyEntity.create(motorcycle, startDate, endDate, coverageDetails, true);

      if (warranty instanceof WarrantyEntity) {
        expect(warranty.motorcycle).toBe(motorcycle);
        expect(warranty.startDate.value).toBe(startDate);
        expect(warranty.endDate.value).toBe(endDate);
        expect(warranty.coverageDetails.value).toBe(coverageDetails);
        expect(warranty.isActive).toBe(true);
      } 
    });

    it('should return an error when start date is in the future', () => {
      const futureStartDate = new Date("2026-01-01");
      const warranty = WarrantyEntity.create(motorcycle, futureStartDate, endDate, coverageDetails, true);

      expect(warranty).toBeInstanceOf(WarrantyStartDateError);
    });

    it('should return an error when end date is before start date', () => {
      const invalidEndDate = new Date("2022-12-31");
      const warranty = WarrantyEntity.create(motorcycle, startDate, invalidEndDate, coverageDetails, true);

      expect(warranty).toBeInstanceOf(WarrantyEndDateError);
    });

    it('should return an error when coverage details are invalid', () => {
      const invalidCoverageDetails = "!!!Invalid Coverage!!!";
      const warranty = WarrantyEntity.create(motorcycle, startDate, endDate, invalidCoverageDetails, true);

      expect(warranty).toBeInstanceOf(WarrantyCoverageDetailsError);
    });
  });

  describe('isWarrantyValid', () => {
    it('should return false when the warranty is not valid for a given date outside the start and end date', () => {
      const warranty = WarrantyEntity.create(motorcycle, startDate, endDate, coverageDetails, true) as WarrantyEntity;

      const checkDate = new Date("2026-06-01"); 

      if(warranty instanceof WarrantyEntity) {
        const isValid = warranty.isWarrantyValid(checkDate);
        expect(isValid).toBe(false);
      }
    });

    it('should return false when the warranty is not active', () => {
      const warranty = WarrantyEntity.create(motorcycle, startDate, endDate, coverageDetails, false) as WarrantyEntity;

      const checkDate = new Date("2024-06-01"); 
      const isValid = warranty.isWarrantyValid(checkDate);

      expect(isValid).toBe(false);
    });
  });

  describe('isRepairCovered', () => {
    it('should return true if the repair date is within warranty and active', () => {
      const warranty = WarrantyEntity.create(motorcycle, startDate, endDate, coverageDetails, true) as WarrantyEntity;

      const repairDate = new Date(); 
      const isCovered = warranty.isRepairCovered(repairDate);

      expect(isCovered).toBe(true); 
    });

    it('should return false if the repair date is outside warranty or inactive', () => {
      const warranty = WarrantyEntity.create(motorcycle, startDate, endDate, coverageDetails, false) as WarrantyEntity;

      const repairDate = new Date("2024-06-01"); 
      const isCovered = warranty.isRepairCovered(repairDate);

      expect(isCovered).toBe(false);
    });

    it('should return false if the repair date is outside warranty period', () => {
      const warranty = WarrantyEntity.create(motorcycle, startDate, endDate, coverageDetails, true) as WarrantyEntity;

      const repairDate = new Date("2026-06-01");
      const isCovered = warranty.isRepairCovered(repairDate);

      expect(isCovered).toBe(false);
    });
  });
});
