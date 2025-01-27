import {
  MotorcycleEntity,
  WarrantyEntity,
} from '@triumph-motorcycles/domain/entities';
import { WarrantyRepository } from '@triumph-motorcycles/application/repositories';

export class CreateWarrantyUsecase {
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
