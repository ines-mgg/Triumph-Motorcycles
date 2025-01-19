import { RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { BreakdownRepository } from "../../repositories/BreakdownRepository";
import { BreakdownNotFoundError } from "../../../domain/errors/breakdown/BreakdownNotFoundError";

export class GetBreakdownRepairHistoryUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(breakdownId: string): Promise<RepairEntity[] | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if (!breakdown) {
      throw new BreakdownNotFoundError();
    }

    return breakdown.getRepairHistory();
  }
}
