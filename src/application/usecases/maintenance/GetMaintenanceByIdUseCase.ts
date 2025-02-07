import { MaintenanceRepositoryInterface } from '@triumph-motorcycles/application/repositories/MaintenanceRepositoryInterface';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenance/MaintenanceEntity';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';

export class GetMaintenanceByIdUseCase {
  constructor(
    private readonly maintenanceRepository: MaintenanceRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<MaintenanceEntity | Error> {
    try {
      const maintenanceOrm = await this.maintenanceRepository.findById(id);

      if (!maintenanceOrm) {
        return new MaintenanceNotFoundError();
      }

      return maintenanceOrm;
    } catch (error) {
      return new MaintenanceNotFoundError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
