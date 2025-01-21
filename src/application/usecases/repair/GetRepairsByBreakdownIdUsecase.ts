import { RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { RepairRepository } from "../../repositories/RepairRepository";

export class GetRepairsByBreakdownIdUsecase {
  constructor(
    private readonly repairRepository: RepairRepository,
  ) {}

  public async execute(breakdownId: string): Promise<RepairEntity[] | Error> {
    return await this.repairRepository.findByBreakdownId(breakdownId);
  }
}
