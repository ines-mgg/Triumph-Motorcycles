import { MaintenanceHistoryRepository } from "../../repositories/MaintenanceHistoryRepository";

export class GetTotalMaintenanceCostUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(motorcycleId?: string): Promise<number> {
    const records = motorcycleId
      ? await this.maintenanceHistoryRepository.findByMotorcycleId(motorcycleId)
      : await this.maintenanceHistoryRepository.findAll();

    return records.reduce((total, record) => total + record.cost, 0);
  }
}
