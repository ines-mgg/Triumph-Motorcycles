import { MaintenanceHistoryRepository } from "../../repositories/MaintenanceHistoryRepository";
import { SparePartEntity } from "@triumph-motorcycles/domain/entities/parts";

export class GetPartsUsageSummaryUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(): Promise<
    { part: SparePartEntity; quantityUsed: number }[]
  > {
    const records = await this.maintenanceHistoryRepository.findAll();

    const partsUsageMap = new Map<
      string,
      { part: SparePartEntity; quantityUsed: number }
    >();

    for (const record of records) {
      for (const part of record.partsUsed) {
        if (partsUsageMap.has(part.id)) {
          partsUsageMap.get(part.id)!.quantityUsed += 1;
        } else {
          partsUsageMap.set(part.id, { part, quantityUsed: 1 });
        }
      }
    }

    return Array.from(partsUsageMap.values());
  }
}
