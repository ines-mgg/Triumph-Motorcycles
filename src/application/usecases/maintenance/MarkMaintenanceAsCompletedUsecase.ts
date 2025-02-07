import { MaintenanceRepositoryInterface } from '@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';

export class MarkMaintenanceAsCompletedUsecase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean | Error> {
    const maintenance = await this.maintenanceRepository.findById(id);

    if (maintenance instanceof MaintenanceNotFoundError) return maintenance;

    return maintenance.isMaintenanceCompleted();
  }
}
