import { RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { BreakdownRepository } from "../../repositories/BreakdownRepository";

export class GetBreakdownRepairHistoryUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(breakdownId: string): Promise<RepairEntity[] | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if(breakdown instanceof Error) return breakdown

    return breakdown.getRepairHistory();
  }
}
