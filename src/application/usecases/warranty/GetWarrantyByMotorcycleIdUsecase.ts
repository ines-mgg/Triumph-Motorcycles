import { WarrantyRepository } from '@triumph-motorcycles/application/repositories/WarrantyRepository';
import { WarrantyEntity } from '@triumph-motorcycles/domain/entities/maintenances/WarrantyEntity';

export class GetWarrantyByMotorcycleIdUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepository) {}

  public async execute(
    motorcycleId: string,
  ): Promise<WarrantyEntity[] | Error> {
    return await this.warrantyRepository.findByMotorcycleId(motorcycleId);
  }
}
