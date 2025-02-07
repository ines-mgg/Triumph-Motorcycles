import { RepairRepositoryInterface } from "@triumph-motorcycles/application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@triumph-motorcycles/domain/entities/repair/RepairEntity";


export class GetRepairByIdUsecase {
  constructor(private readonly repairRepository: RepairRepositoryInterface) {}

  async execute(id: string): Promise<RepairEntity | Error> {
    return await this.repairRepository.findById(id);
  }
}
