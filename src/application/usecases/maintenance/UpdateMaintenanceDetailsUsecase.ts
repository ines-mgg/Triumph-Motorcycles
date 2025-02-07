
import { MaintenanceType } from '@triumph-motorcycles/domain/types/MaintenanceType';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenance/MaintenanceEntity';
import { MaintenanceRepositoryInterface } from '@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface';

export class UpdateMaintenanceDetailsUsecase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
  ) {}

  async execute(
    id: string,
    maintenanceType: MaintenanceType,
    date: Date,
    cost: number,
  ): Promise<MaintenanceEntity | MaintenanceNotFoundError> {
    const maintenance = await this.maintenanceRepository.findById(id);

    if (maintenance instanceof MaintenanceNotFoundError) return maintenance;

    maintenance.updateDetails(maintenanceType, date, cost);
    await this.maintenanceRepository.save(maintenance);

    return maintenance;
  }
}
