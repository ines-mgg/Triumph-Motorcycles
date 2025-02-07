import { MaintenanceRepositoryInterface } from '@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenance/MaintenanceEntity';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';

export class FindMaintenanceByConcessionIdUsecase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
  ) {}

  async execute(
    concessionId: string,
  ): Promise<MaintenanceEntity[] | MaintenanceNotFoundError> {
    return this.maintenanceRepository.findByConcessionId(concessionId);
  }
}
