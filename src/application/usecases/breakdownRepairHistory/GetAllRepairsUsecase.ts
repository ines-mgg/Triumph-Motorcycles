import { BreakdownRepairHistoryEntity } from '@triumph-motorcycles/domain/entities/maintenances/BreakdownRepairHistoryEntity';
import { RepairEntity } from '@triumph-motorcycles/domain/entities/maintenances/RepairEntity';

export class GetAllRepairsUsecase {
  constructor(private readonly repairHistory: BreakdownRepairHistoryEntity) {}

  public execute(): RepairEntity[] {
    return this.repairHistory.getRepairHistory();
  }
}
