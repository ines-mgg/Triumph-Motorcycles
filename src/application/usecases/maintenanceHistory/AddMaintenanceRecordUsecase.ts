import { MaintenanceRecord } from '@triumph-motorcycles/domain/types/motorcycle';
import { MaintenanceHistoryRepository } from '@triumph-motorcycles/application/repositories/MaintenanceHistoryRepository';

export class AddMaintenanceRecordUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(record: MaintenanceRecord): Promise<void | Error> {
    await this.maintenanceHistoryRepository.save(record);
  }
}
