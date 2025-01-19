import { MotorcycleEntity } from "@triumph-motorcycles/domain/entities/drives";
import { MaintenanceRepository } from "../../repositories/MaintenanceRepository";
import { MaintenanceEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export class CreateMaintenanceUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(
    id: string,
    motorcycle: MotorcycleEntity,
    maintenanceIntervalMileage: number,
    maintenanceIntervalTime: number,
  ): Promise<void | Error> {
    const maintenance = MaintenanceEntity.create(
      id,
      motorcycle,
      maintenanceIntervalMileage,
      maintenanceIntervalTime,
    );

    if (maintenance instanceof Error) {
      return maintenance;
    }

    await this.maintenanceRepository.save(maintenance);
  }
}
