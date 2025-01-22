import { BreakdownDescription } from "../../../values/brealdown/BreakdownDescription";
import { MotorcycleEntity } from "../../drives";
import { BreakdownEntity } from "../BreakdownEntity";
import { RepairHistory } from "../RepairHistoryEntity";
import { BreakdownReportedDate } from "../../../values/brealdown/BreakdownReportedDate";

describe('RepairHistory', () => {
  let motorcycle1: MotorcycleEntity;
  let motorcycle2: MotorcycleEntity;
  let breakdown1: BreakdownEntity;
  let breakdown2: BreakdownEntity;
  let repairHistory: RepairHistory;

  beforeEach(() => {
    motorcycle1 = MotorcycleEntity.create("Harley", "Sportster", 2022, new Date(), "Available") as MotorcycleEntity;
    motorcycle2 = MotorcycleEntity.create("Kawasaki", "Ninja", 2023, new Date(), "Available") as MotorcycleEntity;

    const description1 = BreakdownDescription.from("Engine failure");
    if (description1 instanceof Error) {
      throw new Error('Failed to create BreakdownDescription: ' + description1.message);
    }

    const description2 = BreakdownDescription.from("Tire puncture");
    if (description2 instanceof Error) {
      throw new Error('Failed to create BreakdownDescription: ' + description2.message);
    }

    const reportedDate1 = BreakdownReportedDate.from(new Date("2025-01-10"));

    if(reportedDate1 instanceof BreakdownReportedDate) breakdown1 = BreakdownEntity.create(motorcycle1, description1.value, reportedDate1.value, null) as BreakdownEntity;

    const reportedDate2 = BreakdownReportedDate.from(new Date("2025-01-15"));
    if(reportedDate2 instanceof BreakdownReportedDate) breakdown2 = BreakdownEntity.create(motorcycle2, description2.value, reportedDate2.value, null) as BreakdownEntity;

    repairHistory = new RepairHistory();
  });

  describe('addBreakdown', () => {
    it('should add a BreakdownEntity to the history', () => {
      repairHistory.addBreakdown(breakdown1);
      repairHistory.addBreakdown(breakdown2);

      const breakdowns = repairHistory.getBreakdowns();
      expect(breakdowns).toHaveLength(2);
      expect(breakdowns).toContain(breakdown1);
      expect(breakdowns).toContain(breakdown2);
    });
  });

  describe('getBreakdownsByMotorcycle', () => {
    it('should return breakdowns for a specific motorcycle', () => {
      repairHistory.addBreakdown(breakdown1);
      repairHistory.addBreakdown(breakdown2);

      const breakdownsForMotorcycle1 = repairHistory.getBreakdownsByMotorcycle(motorcycle1.id);
      expect(breakdownsForMotorcycle1).toHaveLength(1);
      expect(breakdownsForMotorcycle1[0]).toBe(breakdown1);

      const breakdownsForMotorcycle2 = repairHistory.getBreakdownsByMotorcycle(motorcycle2.id);
      expect(breakdownsForMotorcycle2).toHaveLength(1);
      expect(breakdownsForMotorcycle2[0]).toBe(breakdown2);
    });

    it('should return an empty array when no breakdowns exist for the given motorcycle ID', () => {
      repairHistory.addBreakdown(breakdown1);
      repairHistory.addBreakdown(breakdown2);

      const breakdownsForNonExistentMotorcycle = repairHistory.getBreakdownsByMotorcycle('non-existent-id');
      expect(breakdownsForNonExistentMotorcycle).toHaveLength(0);
    });
  });

  describe('getBreakdowns', () => {
    it('should return all breakdowns in the history', () => {
      repairHistory.addBreakdown(breakdown1);
      repairHistory.addBreakdown(breakdown2);

      const allBreakdowns = repairHistory.getBreakdowns();
      expect(allBreakdowns).toHaveLength(2);
      expect(allBreakdowns).toContain(breakdown1);
      expect(allBreakdowns).toContain(breakdown2);
    });
  });
});
