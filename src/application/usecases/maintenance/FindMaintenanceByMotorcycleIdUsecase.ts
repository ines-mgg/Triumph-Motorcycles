import { MaintenanceRepositoryInterface } from '@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenance/MaintenanceEntity';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';

export class FindMaintenanceByMotorcycleIdUsecase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
  ) {}

  async execute(
    motorcycleId: string,
  ): Promise<MaintenanceEntity[] | MaintenanceNotFoundError> {
    return this.maintenanceRepository.findByMotorcycleId(motorcycleId);
  }
}
