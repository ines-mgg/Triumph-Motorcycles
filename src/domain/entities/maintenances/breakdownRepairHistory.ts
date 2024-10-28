import { Repair } from './repair';

export class BreakdownRepairHistory {
  private readonly repairRecords: Repair[] = []; 

  addRepairRecord(repair: Repair): void {
    this.repairRecords.push(repair);
  }

  getRepairHistory(): Repair[] {
    return this.repairRecords;
  }

  getRepairsByBreakdown(breakdownId: string): Repair[] {
    return this.repairRecords.filter(
      (repair) => repair.breakdownId === breakdownId,
    );
  }
}
