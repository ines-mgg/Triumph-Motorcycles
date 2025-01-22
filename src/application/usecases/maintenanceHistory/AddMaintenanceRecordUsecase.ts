import { MaintenanceRecord } from "../../../domain/types/motorcycle";
import { MaintenanceHistoryRepository } from "../../repositories/MaintenanceHistoryRepository";

export class AddMaintenanceRecordUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(record: MaintenanceRecord): Promise<void | Error> {
    await this.maintenanceHistoryRepository.save(record);
  }
}
