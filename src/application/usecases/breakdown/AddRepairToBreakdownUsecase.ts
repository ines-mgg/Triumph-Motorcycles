import { RepairEntity } from '@triumph-motorcycles/domain/entities';
import { BreakdownRepository } from '@triumph-motorcycles/application/repositories';

export class AddRepairToBreakdownUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(
    breakdownId: string,
    repair: RepairEntity,
  ): Promise<void | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if (breakdown instanceof Error) return breakdown;

    breakdown.addRepair(repair);
    await this.breakdownRepository.save(breakdown);
  }
}
