import { MaintenanceCostNegativeError } from "../../../domain/errors/maintenance/MaintenanceCostNegativeError";
import { MaintenanceIdOrMotorcycleIdError } from "../../../domain/errors/maintenance/MaintenanceIdOrMotorcycleIdError";
import { MaintenancePartsTypeError } from "../../../domain/errors/maintenance/MaintenancePartsTypeError";
import { MaintenanceRecord } from "../../../domain/types/motorcycle";
import { MaintenanceHistoryRepository } from "../../repositories/MaintenanceHistoryRepository";

export class AddMaintenanceRecordUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(record: MaintenanceRecord): Promise<void | Error> {
    if (!record.maintenanceId || !record.motorcycleId) {
      throw new MaintenanceIdOrMotorcycleIdError();
    }
    if (record.cost < 0) {
      throw new MaintenanceCostNegativeError();
    }
    if (!Array.isArray(record.partsUsed)) {
      throw new MaintenancePartsTypeError();
    }

    await this.maintenanceHistoryRepository.save(record);
  }
}
