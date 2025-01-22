import { BreakdownRepairHistoryEntity, RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export class AddRepairRecordUsecase {
  constructor(private readonly repairHistory: BreakdownRepairHistoryEntity) {}

  public execute(repair: RepairEntity): void | Error {
      this.repairHistory.addRepairRecord(repair);
  }
}
