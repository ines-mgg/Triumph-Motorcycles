import { MotorcycleEntity } from "../../drives";
import { BreakdownEntity } from "../BreakdownEntity";
import { BreakdownRepairHistoryEntity } from "../BreakdownRepairHistoryEntity";
import { RepairEntity } from "../RepairEntity";



describe('BreakdownRepairHistoryEntity', () => {
  let breakdownRepairHistory: BreakdownRepairHistoryEntity;
  let breakdown1: BreakdownEntity;
  let breakdown2: BreakdownEntity;
  let repair1: RepairEntity;
  let repair2: RepairEntity;
  let motorcycle: MotorcycleEntity;

  beforeEach(() => {
    breakdownRepairHistory = new BreakdownRepairHistoryEntity();

    const motorcycleResult = MotorcycleEntity.create("moto1", "BrandX", 2020, new Date(), "Active");
    if (motorcycleResult instanceof Error) {
      throw new Error(`Error creating motorcycle: ${motorcycleResult.message}`);
    }
    motorcycle = motorcycleResult;

    const breakdown1Result = BreakdownEntity.create(
      motorcycle,
      'Engine Failure',
      new Date(),
      null 
    );
    const breakdown2Result = BreakdownEntity.create(
      motorcycle,
      'Flat Tire',
      new Date(),
      null 
    );

    if (breakdown1Result instanceof Error) {
      throw new Error(`Error creating breakdown1: ${breakdown1Result.message}`);
    }
    if (breakdown2Result instanceof Error) {
      throw new Error(`Error creating breakdown2: ${breakdown2Result.message}`);
    }

    breakdown1 = breakdown1Result;
    breakdown2 = breakdown2Result;

    const repair1Result = RepairEntity.create(
      breakdown1,
      new Date(),
      ['Brake Replacement', 'Tire Replacement'],
      500
    );
    const repairDate = new Date();
    repairDate.setDate(repairDate.getDate() + 14);

    const repair2Result = RepairEntity.create(
      breakdown2,
      repairDate,
      ['Brake Replacement', 'Tire Replacement'],
      100
    );

    if (repair1Result instanceof Error) {
      throw new Error(`Error creating repair1: ${repair1Result}`);
    }
    if (repair2Result instanceof Error) {
      throw new Error(`Error creating repair2: ${repair2Result}`);
    }

    repair1 = repair1Result;
    repair2 = repair2Result;
  });

  describe('addRepairRecord', () => {
    it('should add a repair record successfully', () => {
      breakdownRepairHistory.addRepairRecord(repair1);
      expect(breakdownRepairHistory.getRepairHistory().length).toBe(1);
      expect(breakdownRepairHistory.getRepairHistory()[0]).toBe(repair1);
    });
  });

  describe('getRepairsByBreakdown', () => {
    it('should return repairs for a specific breakdown', () => {
      breakdownRepairHistory.addRepairRecord(repair1);
      breakdownRepairHistory.addRepairRecord(repair2);
      
      const repairsForBreakdown1 = breakdownRepairHistory.getRepairsByBreakdown(breakdown1.id);
      expect(repairsForBreakdown1.length).toBe(1);
      expect(repairsForBreakdown1[0]).toBe(repair1);
    });

    it('should return an empty array if no repairs match the breakdown ID', () => {
      breakdownRepairHistory.addRepairRecord(repair1);
      breakdownRepairHistory.addRepairRecord(repair2);

      const repairsForNonExistentBreakdown = breakdownRepairHistory.getRepairsByBreakdown('nonExistentBreakdown');
      expect(repairsForNonExistentBreakdown.length).toBe(0);
    });
  });

  describe('getRepairHistory', () => {
    it('should return all repair records', () => {
      breakdownRepairHistory.addRepairRecord(repair1);
      breakdownRepairHistory.addRepairRecord(repair2);

      const allRepairs = breakdownRepairHistory.getRepairHistory();
      expect(allRepairs.length).toBe(2);
      expect(allRepairs).toEqual([repair1, repair2]);
    });
  });
});
