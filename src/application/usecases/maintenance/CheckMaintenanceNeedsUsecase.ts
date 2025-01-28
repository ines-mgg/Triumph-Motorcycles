import { MaintenanceRepository } from '@triumph-motorcycles/application/repositories/MaintenanceRepository';

export class CheckMaintenanceNeedsUsecase {
  constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

  public async execute(maintenanceId: string): Promise<boolean | Error> {
    const maintenance =
      await this.maintenanceRepository.findById(maintenanceId);

    if (maintenance instanceof Error) return maintenance;

    return maintenance.needsMaintenance();
  }
}
