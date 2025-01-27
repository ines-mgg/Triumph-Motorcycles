import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities';
import { MaintenanceRepository } from '@triumph-motorcycles/application/repositories';

export class ListAllMaintenancesUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(): Promise<MaintenanceEntity[] | Error> {
    return await this.maintenanceRepository.findAll();
  }
}
