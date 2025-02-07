import { BreakdownRepositoryInterface } from '@triumph-motorcycles/application/repositories/BreakdownRepositoryInterface';
import { RepairRepositoryInterface } from '@triumph-motorcycles/application/repositories/RepairRepositoryInterface';
import { BreakdownNotFoundError } from '@triumph-motorcycles/domain/errors/breakdown/BreakdownNotFoundError';
import { RepairNotFoundError } from '@triumph-motorcycles/domain/errors/repair/RepairNotFoundError';

export class AddRepairToBreakdownUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepositoryInterface,
    private readonly repairRepository: RepairRepositoryInterface,
  ) {}

  public async execute(
    breakdownId: string,
    repairId: string,
  ): Promise<void | Error> {
    const [breakdown, repair] = await Promise.all([
      this.breakdownRepository.findOneById(breakdownId),
      this.repairRepository.findById(repairId),
    ]);

    if (breakdown instanceof Error) return new BreakdownNotFoundError();
    if (repair instanceof Error) return new RepairNotFoundError();

    breakdown.addRepair(repair);

    return await this.breakdownRepository.addRepair(breakdownId, repairId);
  }
}
