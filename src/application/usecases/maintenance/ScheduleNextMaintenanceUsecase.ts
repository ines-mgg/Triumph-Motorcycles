import { MaintenanceNotFoundError } from "../../../domain/errors/maintenance/MaintenanceNotFoundError";
import { MaintenanceRepository } from "../../repositories/MaintenanceRepository";

export class ScheduleNextMaintenanceUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(maintenanceId: string): Promise<void | Error> {
    const maintenance = await this.maintenanceRepository.findById(maintenanceId);

    if (!maintenance) {
      throw new MaintenanceNotFoundError();
    }

    maintenance.scheduleNextMaintenance();
    await this.maintenanceRepository.save(maintenance);
  }
}
