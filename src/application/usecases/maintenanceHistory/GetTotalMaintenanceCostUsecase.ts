import { MaintenanceHistoryRepository } from '@triumph-motorcycles/application/repositories/MaintenanceHistoryRepository';

export class GetTotalMaintenanceCostUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(motorcycleId?: string): Promise<number | Error> {
    const records = motorcycleId
      ? await this.maintenanceHistoryRepository.findByMotorcycleId(motorcycleId)
      : await this.maintenanceHistoryRepository.findAll();

    if (records instanceof Error) return records;

    return records.reduce((total, record) => total + record.cost, 0);
  }
}
