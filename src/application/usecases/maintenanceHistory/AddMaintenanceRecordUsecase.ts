import { MaintenanceRecord } from '@triumph-motorcycles/domain/types';
import { MaintenanceHistoryRepository } from '@triumph-motorcycles/application/repositories';

export class AddMaintenanceRecordUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(record: MaintenanceRecord): Promise<void | Error> {
    await this.maintenanceHistoryRepository.save(record);
  }
}
