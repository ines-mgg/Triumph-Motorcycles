import { MaintenanceRepositoryInterface } from '@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenance/MaintenanceEntity';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';

export class GetAllMaintenanceRecordsUsecase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
  ) {}

  async execute(): Promise<MaintenanceEntity[] | MaintenanceNotFoundError> {
    return this.maintenanceRepository.findAll();
  }
}
