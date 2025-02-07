import { BreakdownRepositoryInterface } from '@triumph-motorcycles/application/repositories/BreakdownRepositoryInterface';
import { RepairEntity } from '@triumph-motorcycles/domain/entities/repair/RepairEntity';


export class GetBreakdownRepairHistoryUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepositoryInterface,
  ) {}

  public async execute(breakdownId: string): Promise<RepairEntity[] | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if (breakdown instanceof Error) return breakdown;

    return breakdown.getRepairHistory();
  }
}
