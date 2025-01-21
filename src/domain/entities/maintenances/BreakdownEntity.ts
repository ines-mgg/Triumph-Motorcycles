import { BreakdownDescription } from '../../values/brealdown/BreakdownDescription';
import { BreakdownReportedDate } from '../../values/brealdown/BreakdownReportedDate';
import { MotorcycleEntity } from '../drives';
import { BreakdownRepairHistoryEntity } from './BreakdownRepairHistoryEntity';
import { RepairEntity } from './RepairEntity';
import { WarrantyEntity } from './WarrantyEntity';
import crypto from 'crypto';
import { BreakdownInvalidWarrantyError } from '../../errors/breakdown/BreakdownInvalidWarrantyError';

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
    motorcycle: MotorcycleEntity,
    descriptionValue: string,
    reportedDateValue: Date,
    warranty: WarrantyEntity | null,
  ): BreakdownEntity | Error {
    
    const id = crypto.randomUUID();
    
    const description = BreakdownDescription.from(descriptionValue);
    if (description instanceof Error) return description
  

    const reportedDate = BreakdownReportedDate.from(reportedDateValue);
    if (reportedDate instanceof Error) return reportedDate

    return new BreakdownEntity(id, motorcycle, description, reportedDate, warranty);
  }

  public addRepair(repair: RepairEntity): void {

    this.repairHistory.addRepairRecord(repair);

    this.motorcycle.status = 'InMaintenance';
  }

  public getRepairHistory(): RepairEntity[] {
    return this.repairHistory.getRepairHistory();
  }

  public isCoveredByWarranty(checkDate: Date): boolean {
    if (!this.warranty) {
      throw new BreakdownInvalidWarrantyError();
    }
    return this.warranty.isWarrantyValid(checkDate);
  }
}
