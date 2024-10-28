import { Motorcycle } from '../drives/motorcycle';
import { BreakdownRepairHistory } from './breakdownRepairHistory';
import { Repair } from './repair';
import { Warranty } from './warranty';

export class Breakdown {
  private readonly repairHistory: BreakdownRepairHistory;

  constructor(
    public id: string,
    public motorcycle: Motorcycle,
    public description: string,
    public reportedDate: Date,
    public warranty: Warranty | null,
  ) {
    this.repairHistory = new BreakdownRepairHistory();
    this.motorcycle.status = 'InMaintenance';
  }

  addRepair(actions: string, repairDate: Date, cost: number): void {
    const repair = new Repair("123456", this.id, repairDate, actions, cost);
    this.repairHistory.addRepairRecord(repair);
    this.motorcycle.status = 'Available';
  }

  getRepairHistory(): Repair[] {
    return this.repairHistory.getRepairHistory();
  }

  isCoveredByWarranty(checkDate: Date): boolean {
    return this.warranty ? this.warranty.isWarrantyValid(checkDate) : false;
  }
}
