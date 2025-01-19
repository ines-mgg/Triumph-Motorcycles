import { RepairEntity } from './RepairEntity';
import { Maintenances } from '@triumph-motorcycles/domain/errors';

const { IncompleteRepairError } = Maintenances;

export class BreakdownRepairHistoryEntity {
  private readonly repairRecords: RepairEntity[] = [];

  addRepairRecord(repair: RepairEntity): void {
    if (!repair) {
      throw new IncompleteRepairError(
        'RepairEntity record is incomplete or invalid.',
      );
    }
    this.repairRecords.push(repair);
  }

  getRepairHistory(): RepairEntity[] {
    return this.repairRecords;
  }

  getRepairsByBreakdown(breakdownId: string): RepairEntity[] {
    return this.repairRecords.filter(
      (repair) => repair.breakdownId === breakdownId,
    );
  }
}
