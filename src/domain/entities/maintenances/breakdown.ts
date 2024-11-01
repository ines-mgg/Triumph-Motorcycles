import { Motorcycle } from '../drives/motorcycle';
import { BreakdownRepairHistory } from './breakdownRepairHistory';
import { Repair } from './repair';
import { Warranty } from './warranty';
import { Maintenances } from '@triumph-motorcycles/domain/errors';

const { MissingMotorcycleError, IncompleteRepairError, InvalidWarrantyError } =
  Maintenances;

export class Breakdown {
  private readonly repairHistory: BreakdownRepairHistory;

  constructor(
    public id: string,
    public motorcycle: Motorcycle,
    public description: string,
    public reportedDate: Date,
    public warranty: Warranty | null,
  ) {
    if (!motorcycle) {
      throw new MissingMotorcycleError(
        "La moto doit être fournie lors de la création d'un breakdown.",
      );
    }
    this.repairHistory = new BreakdownRepairHistory();
    this.motorcycle.status = 'InMaintenance';
  }

  addRepair(actions: string, repairDate: Date, cost: number): void {
    if (!actions || cost <= 0) {
      throw new IncompleteRepairError(
        'Les actions de réparation et le coût doivent être valides.',
      );
    }
    const repair = new Repair('123456', this.id, repairDate, actions, cost);
    this.repairHistory.addRepairRecord(repair);
    this.motorcycle.status = 'Available';
  }

  getRepairHistory(): Repair[] {
    return this.repairHistory.getRepairHistory();
  }

  isCoveredByWarranty(checkDate: Date): boolean {
    if (!this.warranty) {
      throw new InvalidWarrantyError(
        'Aucune garantie disponible pour cette moto.',
      );
    }
    return this.warranty.isWarrantyValid(checkDate);
  }
}
