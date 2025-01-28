import { BreakdownEntity } from '@triumph-motorcycles/domain/entities/maintenances/BreakdownEntity';
import { RepairEntity } from '@triumph-motorcycles/domain/entities/maintenances/RepairEntity';
import { RepairRepository } from '@triumph-motorcycles/application/repositories/RepairRepository';
import { CommonRepairAction } from '@triumph-motorcycles/domain/types/motorcycle';

export class CreateRepairUsecase {
  constructor(private readonly repairRepository: RepairRepository) {}

  public async execute(
    breakdown: BreakdownEntity,
    repairDateValue: Date,
    actions: CommonRepairAction[],
    costValue: number,
  ): Promise<void | Error> {
    const repair = RepairEntity.create(
      breakdown,
      repairDateValue,
      actions,
      costValue,
    );

    if (repair instanceof Error) return repair;

    await this.repairRepository.save(repair);
  }
}
