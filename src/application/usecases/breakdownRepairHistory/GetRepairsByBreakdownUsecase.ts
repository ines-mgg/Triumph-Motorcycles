import { BreakdownRepairHistoryEntity } from '@triumph-motorcycles/domain/entities/maintenances/BreakdownRepairHistoryEntity';
import { RepairEntity } from '@triumph-motorcycles/domain/entities/maintenances/RepairEntity';

export class GetRepairsByBreakdownUsecase {
  constructor(private readonly repairHistory: BreakdownRepairHistoryEntity) {}

  public execute(breakdownId: string): RepairEntity[] {
    return this.repairHistory.getRepairsByBreakdown(breakdownId);
  }
}
