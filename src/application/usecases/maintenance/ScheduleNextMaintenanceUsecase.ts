import { MaintenanceRepository } from "../../repositories/MaintenanceRepository";

export class ScheduleNextMaintenanceUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(maintenanceId: string): Promise<void | Error> {
    const maintenance = await this.maintenanceRepository.findById(maintenanceId);

    if(maintenance instanceof Error) return maintenance

    maintenance.scheduleNextMaintenance();
    await this.maintenanceRepository.save(maintenance);
  }
}
