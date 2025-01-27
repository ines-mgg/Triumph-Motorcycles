import { MaintenanceHistoryRepository } from '@triumph-motorcycles/application/repositories';
import { MaintenanceRecord } from '@triumph-motorcycles/domain/types';

export class GetMaintenanceByTypeUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(
    maintenanceType: 'Preventive' | 'Corrective',
  ): Promise<MaintenanceRecord[] | Error> {
    return await this.maintenanceHistoryRepository.findByType(maintenanceType);
  }
}
