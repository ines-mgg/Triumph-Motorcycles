import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/drives/MotorcycleEntity';
import { MaintenanceRepository } from '@triumph-motorcycles/application/repositories/MaintenanceRepository';
import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenances/MaintenanceEntity';

export class CreateMaintenanceUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(
    motorcycle: MotorcycleEntity,
    maintenanceIntervalMileage: number,
    maintenanceIntervalTime: number,
  ): Promise<void | Error> {
    const maintenance = MaintenanceEntity.create(
      motorcycle,
      maintenanceIntervalMileage,
      maintenanceIntervalTime,
    );

    if (maintenance instanceof Error) return maintenance;

    await this.maintenanceRepository.save(maintenance);
  }
}
