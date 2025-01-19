import { MaintenanceEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { MaintenanceRepository } from "../../repositories/MaintenanceRepository";

export class ListAllMaintenancesUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(): Promise<MaintenanceEntity[]> {
    return await this.maintenanceRepository.findAll();
  }
}
