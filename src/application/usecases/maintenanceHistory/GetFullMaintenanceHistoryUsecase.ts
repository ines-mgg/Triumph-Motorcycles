import { MaintenanceRecord } from "../../../domain/types/motorcycle";
import { MaintenanceHistoryRepository } from "../../repositories/MaintenanceHistoryRepository";

export class GetFullMaintenanceHistoryUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(): Promise<MaintenanceRecord[]> {
    return await this.maintenanceHistoryRepository.findAll();
  }
}
