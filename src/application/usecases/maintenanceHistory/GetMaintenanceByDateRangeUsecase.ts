import { MaintenanceRecord } from "../../../domain/types/motorcycle";
import { MaintenanceHistoryRepository } from "../../repositories/MaintenanceHistoryRepository";

export class GetMaintenanceByDateRangeUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(
    startDate: Date,
    endDate: Date,
  ): Promise<MaintenanceRecord[] | Error> {
    return await this.maintenanceHistoryRepository.findByDateRange(
      startDate,
      endDate,
    );
  }
}
