import { MaintenanceRecord } from "../../../domain/types/motorcycle";
import { MaintenanceHistoryRepository } from "../../repositories/MaintenanceHistoryRepository";

export class GetMaintenanceByCostRangeUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(
    minCost: number,
    maxCost: number,
  ): Promise<MaintenanceRecord[]> {
    return await this.maintenanceHistoryRepository.findByCostRange(
      minCost,
      maxCost,
    );
  }
}
