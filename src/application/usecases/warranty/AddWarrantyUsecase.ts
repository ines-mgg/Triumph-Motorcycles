import { MotorcycleEntity } from "@triumph-motorcycles/domain/entities/drives";
import { WarrantyRepository } from "../../repositories/WarrantyRepository";
import { WarrantyEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export class AddWarrantyUsecase {
  constructor(
    private readonly warrantyRepository: WarrantyRepository,
  ) {}

  public async execute(
    id: string,
    motorcycle: MotorcycleEntity,
    startDateValue: Date,
    endDateValue: Date,
    coverageDetailsValue: string,
    isActive: boolean,
  ): Promise<void | Error> {
    const warranty = WarrantyEntity.create(
      id,
      motorcycle,
      startDateValue,
      endDateValue,
      coverageDetailsValue,
      isActive
    );

    if (warranty instanceof Error) {
      return warranty;
    }

    await this.warrantyRepository.save(warranty);
  }
}
