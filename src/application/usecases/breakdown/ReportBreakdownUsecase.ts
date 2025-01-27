import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities';
import {
  BreakdownEntity,
  WarrantyEntity,
} from '@triumph-motorcycles/domain/entities';
import { BreakdownRepository } from '@triumph-motorcycles/application/repositories';

export class ReportBreakdownUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(
    motorcycle: MotorcycleEntity,
    descriptionValue: string,
    reportedDateValue: Date,
    warranty: WarrantyEntity | null,
  ): Promise<void | Error> {
    const breakdown = BreakdownEntity.create(
      motorcycle,
      descriptionValue,
      reportedDateValue,
      warranty,
    );

    if (breakdown instanceof Error) return breakdown;

    await this.breakdownRepository.save(breakdown);
  }
}
