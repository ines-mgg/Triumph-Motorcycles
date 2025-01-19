import { BreakdownRepairHistoryEntity, RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export class GetAllRepairsUsecase {
  constructor(private readonly repairHistory: BreakdownRepairHistoryEntity) {}

  public execute(): RepairEntity[] {
    return this.repairHistory.getRepairHistory();
  }
}
