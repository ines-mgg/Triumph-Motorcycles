import { RepairEntity } from './RepairEntity';

export class BreakdownRepairHistoryEntity {
  private readonly repairRecords: RepairEntity[] = [];

  addRepairRecord(repair: RepairEntity): void {
    this.repairRecords.push(repair);
  }

  getRepairHistory(): RepairEntity[] {
    return this.repairRecords;
  }

  getRepairsByBreakdown(breakdownId: string): RepairEntity[] {
    return this.repairRecords.filter(
      (repair) => repair.breakdown.id === breakdownId,
    );
  }
}
