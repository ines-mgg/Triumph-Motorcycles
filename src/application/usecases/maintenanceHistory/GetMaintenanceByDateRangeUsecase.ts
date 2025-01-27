import { MaintenanceRecord } from '@triumph-motorcycles/domain/types';
import { MaintenanceHistoryRepository } from '@triumph-motorcycles/application/repositories';

export class GetMaintenanceByDateRangeUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(
    startDate: Date,
    endDate: Date,
  ): Promise<MaintenanceRecord[] | Error> {
    return await this.maintenanceHistoryRepository.findByDateRange(
      startDate,
      endDate,
    );
  }
}
