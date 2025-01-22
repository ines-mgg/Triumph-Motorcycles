import { BreakdownEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { RepairHistory } from "./RepairHistoryUsecases";

export class AddBreakdownToRepairHistoryUsecase {
  constructor(
    private readonly repairHistory: RepairHistory,
  ) {}

  public execute(breakdown: BreakdownEntity): void {
    this.repairHistory.addBreakdown(breakdown);
  }
}
