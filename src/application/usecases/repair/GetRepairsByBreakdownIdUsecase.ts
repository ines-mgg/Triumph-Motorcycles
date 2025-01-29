import { RepairEntity } from '@triumph-motorcycles/domain/entities/maintenances/RepairEntity';
import { RepairRepository } from '@triumph-motorcycles/application/repositories/RepairRepository';

export class GetRepairsByBreakdownIdUsecase {
  constructor(private readonly repairRepository: RepairRepository) {}

  public async execute(breakdownId: string): Promise<RepairEntity[] | Error> {
    return await this.repairRepository.findByBreakdownId(breakdownId);
  }
}
