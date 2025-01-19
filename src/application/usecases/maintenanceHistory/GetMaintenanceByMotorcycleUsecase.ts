import { MaintenanceRecord } from "../../../domain/types/motorcycle";
import { MaintenanceHistoryRepository } from "../../repositories/MaintenanceHistoryRepository";

export class GetMaintenanceByMotorcycleUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(motorcycleId: string): Promise<MaintenanceRecord[]> {
    return await this.maintenanceHistoryRepository.findByMotorcycleId(
      motorcycleId,
    );
  }
}
