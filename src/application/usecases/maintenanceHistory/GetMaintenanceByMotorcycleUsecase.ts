import { MaintenanceHistoryRepository } from '@triumph-motorcycles/application/repositories/MaintenanceHistoryRepository';
import { MaintenanceRecord } from '@triumph-motorcycles/domain/types/motorcycle';

export class GetMaintenanceByMotorcycleUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(
    motorcycleId: string,
  ): Promise<MaintenanceRecord[] | Error> {
    return await this.maintenanceHistoryRepository.findByMotorcycleId(
      motorcycleId,
    );
  }
}
