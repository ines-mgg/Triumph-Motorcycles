import { BreakdownEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { RepairHistory } from "./RepairHistoryUsecases";

export class GetBreakdownHistoryUsecase {
  constructor(
    private readonly repairHistory: RepairHistory,
  ) {}

  public execute(): BreakdownEntity[] {
    return this.repairHistory.getBreakdowns();
  }
}
