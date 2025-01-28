import { BreakdownRepairHistoryEntity } from '@triumph-motorcycles/domain/entities/maintenances/BreakdownRepairHistoryEntity';
import { RepairEntity } from '@triumph-motorcycles/domain/entities/maintenances/RepairEntity';

export class AddRepairRecordUsecase {
  constructor(private readonly repairHistory: BreakdownRepairHistoryEntity) {}

  public execute(repair: RepairEntity): void | Error {
    this.repairHistory.addRepairRecord(repair);
  }
}
