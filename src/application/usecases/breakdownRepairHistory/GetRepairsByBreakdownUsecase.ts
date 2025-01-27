import {
  BreakdownRepairHistoryEntity,
  RepairEntity,
} from '@triumph-motorcycles/domain/entities';

export class GetRepairsByBreakdownUsecase {
  constructor(private readonly repairHistory: BreakdownRepairHistoryEntity) {}

  public execute(breakdownId: string): RepairEntity[] {
    return this.repairHistory.getRepairsByBreakdown(breakdownId);
  }
}
