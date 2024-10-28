import { Repair } from './repair'; // Ensure correct import path

export class BreakdownRepairHistory {
  private repairRecords: Repair[] = []; // Store all repair records related to breakdowns

  // Add a repair record to the history
  addRepairRecord(repair: Repair): void {
    this.repairRecords.push(repair);
  }

  // Retrieve the full repair history
  getRepairHistory(): Repair[] {
    return this.repairRecords;
  }

  // Get repairs for a specific breakdown
  getRepairsByBreakdown(breakdownId: string): Repair[] {
    return this.repairRecords.filter(
      (repair) => repair.breakdownId === breakdownId,
    );
  }
}
