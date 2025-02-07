import { RepairRepositoryInterface } from "@triumph-motorcycles/application/repositories/RepairRepositoryInterface";
import { RepairEntity } from "@triumph-motorcycles/domain/entities/repair/RepairEntity";
import { RepairNotCompletedError } from "@triumph-motorcycles/domain/errors/repair/RepairNotCompletedError";


export class UpdateRepairUsecase {
  constructor(private readonly repairRepository: RepairRepositoryInterface) {}

  async execute(repair: RepairEntity): Promise<RepairEntity | Error> {
    if (!repair.isRepairCompleted()) {
      return new RepairNotCompletedError();
    }

    await this.repairRepository.update(repair);

    return repair;
  }
}
