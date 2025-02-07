import { BreakdownRepository } from "@triumph-motorcycles/application/repositories/BreakdownRepository";

export class UpdateBreakdownDescriptionUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(breakdownId: string, newDescription: string): Promise<void | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if (breakdown instanceof Error) return breakdown;
    

    const result = breakdown.updateBreakdownDescription(newDescription);

    if (result instanceof Error) {
      return result;
    }

    await this.breakdownRepository.updateDescription(breakdownId, newDescription);
  }
}
