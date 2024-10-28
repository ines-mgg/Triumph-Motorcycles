import { Motorcycle } from '../drives/motorcycle';
import { BreakdownRepairHistory } from './breakdownRepairHistory';
import { Repair } from './repair';
import { Warranty } from './warranty';

export class Breakdown {
  private repairHistory: BreakdownRepairHistory;

  constructor(
    public id: string,
    public motorcycle: Motorcycle, // Reference to Motorcycle
    public description: string,
    public reportedDate: Date,
    public warranty: Warranty | null,
  ) {
    this.repairHistory = new BreakdownRepairHistory();
    this.motorcycle.status = 'InMaintenance'; // Set status when a breakdown occurs
  }

  // Add a repair and update motorcycle status to 'Available' after repair completion
  addRepair(actions: string, repairDate: Date, cost: number): void {
    const repair = new Repair(this.id, repairDate, actions, cost);
    this.repairHistory.addRepairRecord(repair);
    this.motorcycle.status = 'Available'; // Update status after repair
  }

  // Retrieve the history of all repairs for this breakdown
  getRepairHistory(): Repair[] {
    return this.repairHistory.getRepairHistory();
  }

  // Check if the breakdown is covered by warranty
  isCoveredByWarranty(checkDate: Date): boolean {
    return this.warranty ? this.warranty.isWarrantyValid(checkDate) : false;
  }
}
