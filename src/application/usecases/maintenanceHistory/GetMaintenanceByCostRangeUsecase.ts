import { MaintenanceRecord } from '@triumph-motorcycles/domain/types/motorcycle';
import { MaintenanceHistoryRepository } from '@triumph-motorcycles/application/repositories/MaintenanceHistoryRepository';

export class GetMaintenanceByCostRangeUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(
    minCost: number,
    maxCost: number,
  ): Promise<MaintenanceRecord[] | Error> {
    return await this.maintenanceHistoryRepository.findByCostRange(
      minCost,
      maxCost,
    );
  }
}
