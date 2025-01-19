import { MaintenanceEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { MaintenanceRepository } from "../../repositories/MaintenanceRepository";

export class FindMaintenanceByIdUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(maintenanceId: string): Promise<MaintenanceEntity | null> {
    return await this.maintenanceRepository.findById(maintenanceId);
  }
}
