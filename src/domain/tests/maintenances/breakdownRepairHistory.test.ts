import { BreakdownRepairHistory } from "../../entities/maintenances/breakdownRepairHistory";
import { Repair } from "../../entities/maintenances/repair";

describe('Repair History', () => {
  let history: BreakdownRepairHistory;
  let repair1: Repair;
  let repair2: Repair;

  beforeEach(() => {
    history = new BreakdownRepairHistory();
    repair1 = new Repair("1", "breakdown1", new Date('2023-07-01'), 'Engine Repair', 300); 
    repair2 = new Repair("2", "breakdown1", new Date('2023-07-02'), 'Battery Replacement', 150);
  });

  describe('addRepairRecord', () => {
    it("should add a repair record to the history", () => {
      history.addRepairRecord(repair1);
      expect(history.getRepairHistory().length).toBe(1);
      expect(history.getRepairHistory()[0]).toEqual(repair1);
    });

    it("should allow adding multiple repair records", () => {
      history.addRepairRecord(repair1);
      history.addRepairRecord(repair2);
      expect(history.getRepairHistory().length).toBe(2);
      expect(history.getRepairHistory()).toEqual(expect.arrayContaining([repair1, repair2]));
    });
  });

  describe('getRepairHistory', () => {
    it("should return all repair records", () => {
      history.addRepairRecord(repair1);
      history.addRepairRecord(repair2);
      const repairs = history.getRepairHistory();
      expect(repairs.length).toBe(2);
      expect(repairs).toEqual(expect.arrayContaining([repair1, repair2]));
    });

    it("should return an empty array if no repair records have been added", () => {
      expect(history.getRepairHistory()).toEqual([]);
    });
  });

  describe('getRepairsByBreakdown', () => {
    it("should return repairs associated with a specific breakdown", () => {
      history.addRepairRecord(repair1);
      history.addRepairRecord(repair2);
      const repairs = history.getRepairsByBreakdown('breakdown1');
      expect(repairs.length).toBe(2);
      expect(repairs).toEqual(expect.arrayContaining([repair1, repair2]));
    });

    it("should return an empty array if no repairs are associated with the provided breakdown ID", () => {
      history.addRepairRecord(repair1);
      const repairs = history.getRepairsByBreakdown('breakdown2');
      expect(repairs.length).toBe(0);
    });
  });
});
