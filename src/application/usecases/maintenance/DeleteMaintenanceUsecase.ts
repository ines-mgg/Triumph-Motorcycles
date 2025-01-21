import { MaintenanceRepository } from "../../repositories/MaintenanceRepository";

export class DeleteMaintenanceUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(maintenanceId: string): Promise<void | Error> {
    const maintenance = await this.maintenanceRepository.findById(maintenanceId);

    if(maintenance instanceof Error) return maintenance

    await this.maintenanceRepository.deleteById(maintenanceId);
  }
}
