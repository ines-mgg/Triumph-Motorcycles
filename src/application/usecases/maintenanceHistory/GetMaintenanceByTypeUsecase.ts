import { MaintenanceRecord } from "../../../domain/types/motorcycle";
import { MaintenanceHistoryRepository } from "../../repositories/MaintenanceHistoryRepository";

export class GetMaintenanceByTypeUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(
    maintenanceType: 'Preventive' | 'Corrective',
  ): Promise<MaintenanceRecord[] |Error> {
    return await this.maintenanceHistoryRepository.findByType(maintenanceType);
  }
}
