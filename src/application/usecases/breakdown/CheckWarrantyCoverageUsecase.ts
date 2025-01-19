import { BreakdownNotFoundError } from "../../../domain/errors/breakdown/BreakdownNotFoundError";
import { BreakdownRepository } from "../../repositories/BreakdownRepository";

export class CheckWarrantyCoverageUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(breakdownId: string, checkDate: Date): Promise<boolean | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if (!breakdown) {
      throw new BreakdownNotFoundError();
    }

    return breakdown.isCoveredByWarranty(checkDate);
  }
}
