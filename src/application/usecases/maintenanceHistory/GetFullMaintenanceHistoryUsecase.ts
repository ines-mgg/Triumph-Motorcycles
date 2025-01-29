import { MaintenanceRecord } from '@triumph-motorcycles/domain/types/motorcycle';
import { MaintenanceHistoryRepository } from '@triumph-motorcycles/application/repositories/MaintenanceHistoryRepository';

export class GetFullMaintenanceHistoryUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(): Promise<MaintenanceRecord[] | Error> {
    return await this.maintenanceHistoryRepository.findAll();
  }
}
