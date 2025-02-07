import { BreakdownRepositoryInterface } from "@triumph-motorcycles/application/repositories/BreakdownRepositoryInterface";
import { RepairRepositoryInterface } from "@triumph-motorcycles/application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@triumph-motorcycles/domain/entities/repair/RepairEntity";
import { CommonRepairAction } from "@triumph-motorcycles/domain/types/motorcycle";


export class CreateRepairUsecase {
  constructor(
    private readonly repairRepository: RepairRepositoryInterface,
    private readonly breakdownRepository: BreakdownRepositoryInterface
  ) {}

  async execute(
    breakdownId: string,
    repairDateValue: Date,
    actions: CommonRepairAction[],
    costValue: number
  ): Promise<void | Error> {
    try {

      const breakdown = await this.breakdownRepository.findOneById(breakdownId);
      if (breakdown instanceof Error) return breakdown;

      const repair = RepairEntity.create(null, breakdown, repairDateValue, actions, costValue);
      if (repair instanceof Error) return repair;

      repair.associateRepairWithMotorcycle();

      await this.repairRepository.save(repair);

    } catch (error) {
      return new Error(`Failed to create repair: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}
