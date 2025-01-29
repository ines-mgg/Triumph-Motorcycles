import { MaintenanceHistoryRepository } from '@triumph-motorcycles/application/repositories/MaintenanceHistoryRepository';
import { SparePartEntity } from '@triumph-motorcycles/domain/entities/parts/SparePartEntity';

export class GetPartsUsageSummaryUsecase {
  constructor(
    private readonly maintenanceHistoryRepository: MaintenanceHistoryRepository,
  ) {}

  public async execute(): Promise<
    { part: SparePartEntity; quantityUsed: number }[] | Error
  > {
    const records = await this.maintenanceHistoryRepository.findAll();

    const partsUsageMap = new Map<
      string,
      { part: SparePartEntity; quantityUsed: number }
    >();

    if (records instanceof Error) return records;

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
