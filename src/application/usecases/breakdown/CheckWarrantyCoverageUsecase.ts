import { BreakdownRepository } from '@triumph-motorcycles/application/repositories/BreakdownRepository';

export class CheckWarrantyCoverageUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(breakdownId: string): Promise<boolean | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if (breakdown instanceof Error) return breakdown;

    return breakdown.isCoveredByWarranty(new Date());
  }
}
