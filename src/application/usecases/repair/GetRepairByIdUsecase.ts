import { RepairEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { RepairRepository } from "../../repositories/RepairRepository";

export class GetRepairByIdUsecase {
  constructor(
    private readonly repairRepository: RepairRepository,
  ) {}

  public async execute(id: string): Promise<RepairEntity | Error> {
    return await this.repairRepository.findById(id);
  }
}
