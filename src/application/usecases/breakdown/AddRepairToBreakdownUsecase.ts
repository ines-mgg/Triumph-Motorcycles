import { RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { CommonRepairAction } from "../../../domain/types/motorcycle";
import { BreakdownRepository } from "../../repositories/BreakdownRepository";

export class AddRepairToBreakdownUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(
    breakdownId: string,
    actions: CommonRepairAction[],
    repairDate: Date,
    cost: number,
    repair: RepairEntity,
  ): Promise<void | Error> {
    const breakdown = await this.breakdownRepository.findOneById(breakdownId);

    if (!breakdown) {
      throw new Error("Breakdown not found.");
    }

    breakdown.addRepair(actions, repairDate, cost, repair);
    await this.breakdownRepository.save(breakdown);
  }
}
