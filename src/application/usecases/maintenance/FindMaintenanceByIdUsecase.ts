import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenances/MaintenanceEntity';
import { MaintenanceRepository } from '@triumph-motorcycles/application/repositories/MaintenanceRepository';

export class FindMaintenanceByIdUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(
    maintenanceId: string,
  ): Promise<MaintenanceEntity | Error> {
    return await this.maintenanceRepository.findById(maintenanceId);
  }
}
