import { MaintenanceRepositoryInterface } from '@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';

export class PredictNextMaintenanceDateUsecase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
  ) {}

  async execute(id: string): Promise<Date | MaintenanceNotFoundError> {
    const maintenance = await this.maintenanceRepository.findById(id);

    if (maintenance instanceof MaintenanceNotFoundError) return maintenance;

    return maintenance.predictNextMaintenanceDate();
  }
}
