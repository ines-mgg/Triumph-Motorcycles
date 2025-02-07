import { MaintenanceRepositoryInterface } from '@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenance/MaintenanceEntity';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';
import { ConcessionEntity } from '@triumph-motorcycles/domain/entities/concession/ConcessionEntity';

export class UpdateMaintenanceConcessionUsecase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
  ) {}

  async execute(
    maintenanceId: string,
    concession: ConcessionEntity,
  ): Promise<MaintenanceEntity | MaintenanceNotFoundError> {
    const maintenance = await this.maintenanceRepository.findById(
      maintenanceId,
    );

    if (maintenance instanceof MaintenanceNotFoundError) return maintenance;

    maintenance.updateConcession(concession);
    await this.maintenanceRepository.save(maintenance);

    return maintenance;
  }
}
