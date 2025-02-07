import { BreakdownRepository } from "@triumph-motorcycles/application/repositories/BreakdownRepository";
import { RepairRepository } from "@triumph-motorcycles/application/repositories/RepairRepository";
import { BreakdownNotFoundError } from "@triumph-motorcycles/domain/errors/breakdown/BreakdownNotFoundError";
import { RepairNotFoundError } from "@triumph-motorcycles/domain/errors/repair/RepairNotFoundError";


export class AddRepairToBreakdownUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepository,
    private readonly repairRepository: RepairRepository
  ) {}

  public async execute(
    breakdownId: string,
    repairId: string
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
