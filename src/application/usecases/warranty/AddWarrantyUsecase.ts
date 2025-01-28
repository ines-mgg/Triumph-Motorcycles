import { WarrantyRepository } from '@triumph-motorcycles/application/repositories/WarrantyRepository';
import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/drives/MotorcycleEntity';
import { WarrantyEntity } from '@triumph-motorcycles/domain/entities/maintenances/WarrantyEntity';

export class AddWarrantyUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepository) {}

  public async execute(
    motorcycle: MotorcycleEntity,
    startDateValue: Date,
    endDateValue: Date,
    coverageDetailsValue: string,
    isActive: boolean,
  ): Promise<void | Error> {
    const warranty = WarrantyEntity.create(
      motorcycle,
      startDateValue,
      endDateValue,
      coverageDetailsValue,
      isActive,
    );

    if (warranty instanceof Error) return warranty;

    await this.warrantyRepository.save(warranty);
  }
}
