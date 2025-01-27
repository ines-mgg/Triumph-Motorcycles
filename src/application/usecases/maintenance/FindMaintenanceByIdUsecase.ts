import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities';
import { MaintenanceRepository } from '@triumph-motorcycles/application/repositories';

export class FindMaintenanceByIdUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(
    maintenanceId: string,
  ): Promise<MaintenanceEntity | Error> {
    return await this.maintenanceRepository.findById(maintenanceId);
  }
}
