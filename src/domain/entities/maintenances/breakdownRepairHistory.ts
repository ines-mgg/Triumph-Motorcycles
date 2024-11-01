import { Repair } from './repair';
import { Maintenances } from '@triumph-motorcycles/domain/errors';

const { IncompleteRepairError } = Maintenances;

export class BreakdownRepairHistory {
  private readonly repairRecords: Repair[] = [];

  addRepairRecord(repair: Repair): void {
    if (!repair || !repair.breakdownId || repair.cost <= 0 || !repair.actions) {
      throw new IncompleteRepairError(
        'Repair record is incomplete or invalid.',
      );
    }
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
