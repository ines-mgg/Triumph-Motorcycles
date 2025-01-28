import { RepairEntity } from '@triumph-motorcycles/domain/entities/maintenances/RepairEntity';
import { RepairRepository } from '@triumph-motorcycles/application/repositories/RepairRepository';

export class GetRepairsByDateRangeUsecase {
  constructor(private readonly repairRepository: RepairRepository) {}

  public async execute(
    startDate: Date,
    endDate: Date,
  ): Promise<RepairEntity[] | Error> {
    return await this.repairRepository.findByRepairDateRange(
      startDate,
      endDate,
    );
  }
}
