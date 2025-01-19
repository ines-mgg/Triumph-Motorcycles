import { MaintenanceNotFoundError } from "../../../domain/errors/maintenance/MaintenanceNotFoundError";
import { MaintenanceRepository } from "../../repositories/MaintenanceRepository";

export class CheckMaintenanceNeedsUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(maintenanceId: string): Promise<boolean | Error> {
    const maintenance = await this.maintenanceRepository.findById(maintenanceId);

    if (!maintenance) {
      throw new MaintenanceNotFoundError();
    }

    return maintenance.needsMaintenance();
  }
}
