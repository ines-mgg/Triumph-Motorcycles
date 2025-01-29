import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/drives/MotorcycleEntity';
import { WarrantyEntity } from '@triumph-motorcycles/domain/entities/maintenances/WarrantyEntity';
import { BreakdownEntity } from '@triumph-motorcycles/domain/entities/maintenances/BreakdownEntity';
import { BreakdownRepository } from '@triumph-motorcycles/application/repositories/BreakdownRepository';

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
