import { RepairEntity } from '@triumph-motorcycles/domain/entities';
import { RepairRepository } from '@triumph-motorcycles/application/repositories';

export class GetRepairByIdUsecase {
  constructor(private readonly repairRepository: RepairRepository) {}

  public async execute(id: string): Promise<RepairEntity | Error> {
    return await this.repairRepository.findById(id);
  }
}
