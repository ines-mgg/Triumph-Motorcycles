import { CommonRepairAction } from "../../types/motorcycle";
import { BreakdownDescriptionError } from '../../errors/breakdown/BreakdownDescriptionError';
import { BreakdownReportedDateError } from '../../errors/breakdown/BreakdownReportedDateError';
import { MissingMotorcycleError } from '../../errors/drivers';
import { IncompleteRepairError, InvalidWarrantyError } from '../../errors/maintenances';
import { BreakdownDescription } from '../../values/brealdown/BreakdownDescription';
import { BreakdownReportedDate } from '../../values/brealdown/BreakdownReportedDate';
import { MotorcycleEntity } from '../drives';
import { BreakdownRepairHistoryEntity } from './BreakdownRepairHistoryEntity';
import { RepairEntity } from './RepairEntity';
import { WarrantyEntity } from './WarrantyEntity';

export class BreakdownEntity {
  private readonly repairHistory: BreakdownRepairHistoryEntity;

  private constructor(
    public readonly id: string,
    public readonly motorcycle: MotorcycleEntity,
    public description: BreakdownDescription,
    public readonly reportedDate: BreakdownReportedDate,
    public warranty: WarrantyEntity | null,
  ) {
    this.repairHistory = new BreakdownRepairHistoryEntity();
    this.motorcycle.status = 'InMaintenance';
  }

  public static create(
    id: string,
    motorcycle: MotorcycleEntity,
    descriptionValue: string,
    reportedDateValue: Date,
    warranty: WarrantyEntity | null,
  ): BreakdownEntity | Error {
    if (!motorcycle) {
      throw new MissingMotorcycleError(
        "La moto doit être fournie lors de la création d'un breakdown."
      );
    }

    const description = BreakdownDescription.from(descriptionValue);
    if (description instanceof Error) {
      throw new BreakdownDescriptionError(description.message);
    }

    const reportedDate = BreakdownReportedDate.from(reportedDateValue);
    if (reportedDate instanceof Error) {
      throw new BreakdownReportedDateError(reportedDate.message);
    }

    return new BreakdownEntity(id, motorcycle, description, reportedDate, warranty);
  }

  public addRepair(actions: CommonRepairAction[], repairDate: Date, cost: number, repair: RepairEntity): void {
    if (!actions || actions.length === 0) {
      throw new IncompleteRepairError('Repair actions must be provided.');
    }
    if (cost <= 0) {
      throw new IncompleteRepairError('Repair cost must be greater than zero.');
    }
    if (!(repairDate instanceof Date) || isNaN(repairDate.getTime())) {
      throw new IncompleteRepairError('Invalid repair date provided.');
    }

    this.repairHistory.addRepairRecord(repair);

    this.motorcycle.status = 'Available';
  }

  public getRepairHistory(): RepairEntity[] {
    return this.repairHistory.getRepairHistory();
  }

  public isCoveredByWarranty(checkDate: Date): boolean {
    if (!this.warranty) {
      throw new InvalidWarrantyError('Aucune garantie disponible pour cette moto.');
    }
    return this.warranty.isWarrantyValid(checkDate);
  }
}
